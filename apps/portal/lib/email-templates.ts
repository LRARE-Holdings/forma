export interface EmailTemplate {
  id: string;
  label: string;
  subject: string;
  body: string;
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "quote_followup",
    label: "Quote follow-up",
    subject: "Following up on {{studio_name}}",
    body: `Hi {{owner_first_name}},

Just following up on the quote request you sent through for {{studio_name}}. I'd love to find a time to walk you through what we'd build for you and answer any questions.

Are you free for a 20-minute call this week or next? Here's my calendar: [link]

Best,
[your name]
Forma`,
  },
  {
    id: "discovery_call",
    label: "Discovery call invite",
    subject: "Quick call about {{studio_name}}?",
    body: `Hi {{owner_first_name}},

Thanks for getting in touch about {{studio_name}}. Before I put together a proper quote, I'd love a quick 15-minute call to understand what you're looking for and how Forma can help.

What time works best for you? Happy to fit around your schedule.

Best,
[your name]
Forma`,
  },
];
