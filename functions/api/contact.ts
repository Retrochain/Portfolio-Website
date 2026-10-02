interface Env {
    TURNSTILE_SECRET_KEY: string;
    RESEND_API_KEY: string;
}

interface TurnstileResponse {
    success: boolean;
    "error-codes"?: string[];
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const formData = await context.request.formData();

        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const subject = String(formData.get("subject") ?? "").trim();
        const message = String(formData.get("message") ?? "").trim();

        const turnstileToken = String(
            formData.get("cf-turnstile-response") ?? "",
        );

        // -------------------------
        // Validate fields
        // -------------------------

        if (!name || !email || !subject || !message) {
            return Response.json(
                { error: "Please complete all fields." },
                { status: 400 },
            );
        }

        if (name.length > 100) {
            return Response.json(
                { error: "Name is too long." },
                { status: 400 },
            );
        }

        if (subject.length > 200) {
            return Response.json(
                { error: "Subject is too long." },
                { status: 400 },
            );
        }

        if (message.length > 5000) {
            return Response.json(
                { error: "Message is too long." },
                { status: 400 },
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return Response.json(
                { error: "Please enter a valid email address." },
                { status: 400 },
            );
        }

        // -------------------------
        // Verify Turnstile
        // -------------------------

        if (!turnstileToken) {
            return Response.json(
                { error: "Please complete the verification." },
                { status: 400 },
            );
        }

        const turnstileResponse = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    secret: context.env.TURNSTILE_SECRET_KEY,
                    response: turnstileToken,
                }),
            },
        );

        const turnstileResult =
            (await turnstileResponse.json()) as TurnstileResponse;

        if (!turnstileResult.success) {
            return Response.json(
                { error: "Verification failed. Please try again." },
                { status: 403 },
            );
        }

        // -------------------------
        // Send email with Resend
        // -------------------------

        const resendResponse = await fetch(
            "https://api.resend.com/emails",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "Portfolio Contact <contact@akshaansingh.com>",
                    to: ["akshaansingh.2018@gmail.com"],
                    reply_to: email,
                    subject: `Portfolio contact: ${subject}`,
                    text: [
                        `Name: ${name}`,
                        `Email: ${email}`,
                        `Subject: ${subject}`,
                        "",
                        message,
                    ].join("\n"),
                }),
            },
        );

        if (!resendResponse.ok) {
            console.error(
                "Resend error:",
                await resendResponse.text(),
            );

            return Response.json(
                { error: "Unable to send your message." },
                { status: 500 },
            );
        }

        return Response.json({
            success: true,
        });
    } catch (error) {
        console.error("Contact form error:", error);

        return Response.json(
            { error: "Something went wrong." },
            { status: 500 },
        );
    }
};