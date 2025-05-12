export async function subscribeCalendar(channelId: string, token: string) {

    const requestObject = {
        "id": channelId,
        "type": "web_hook",
        "address": process.env.WEB_TUNNEL_URL 
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events/watch`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestObject),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to subscribe calendar");
        }

        console.log("Calendar subscribed successfully");
    } catch (error) {
        console.log("unable to subscribe calendar", error);
    }
}