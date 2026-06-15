# Daniel Ortiz - Backend Engineer Portfolio

A premium portfolio website for Daniel David Ortiz Villanueva, a Backend Engineer specializing in Java, Spring Boot, and Cloud Computing.

## Tech Stack

- **Framework**: Next.js 13.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: Dark/Light mode with next-themes

## Features

- Premium dark mode design with glass morphism effects
- Smooth scroll animations and micro-interactions
- Responsive design for all devices
- SEO optimized with Open Graph and Twitter cards
- Accessible and keyboard-friendly

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and design system
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── layout/
│   │   ├── header.tsx       # Navigation header
│   │   ├── footer.tsx       # Site footer
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── sections/
│   │   ├── hero.tsx         # Hero section
│   │   ├── about.tsx        # About me section
│   │   ├── technologies.tsx # Tech stack section
│   │   ├── projects.tsx     # Projects showcase
│   │   ├── architecture.tsx # Architecture patterns
│   │   ├── experience.tsx   # Experience timeline
│   │   ├── certifications.tsx
│   │   ├── github.tsx       # GitHub activity
│   │   └── contact.tsx      # Contact form
│   └── ui-custom/
│       ├── command-palette.tsx
│       └── scroll-animations.tsx
├── lib/
│   └── utils.ts
└── public/
    └── resume.pdf           # Your CV file
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env` file in the root directory for local development and set the following values:

```env
NEXT_PUBLIC_GITHUB_USERNAME=DanielOrtiz08
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/daniel-david-ortiz-villanueva-7a8053257

RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_OWNER_EMAIL=ddov0811@gmail.com

WHATSAPP_SERVICE=telegram
WHATSAPP_PHONE=3243913693
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

REDIS_URL=rediss://:password@host:6380?ssl=true
ANTISPAM_WINDOW_MS=60000
ANTISPAM_MAX_PER_WINDOW=3
ANTISPAM_REPEAT_MS=10000
```

> Important: Do not commit `.env` to GitHub. Keep secret values in Azure App Service configuration or GitHub Actions secrets.

For Azure deployment, use the instructions in [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md).

## Customization

### Adding New Projects

Edit `components/sections/projects.tsx` and add to the `projects` array:

```typescript
{
  id: 6,
  title: 'Project Name',
  description: 'Project description',
  technologies: ['Tech1', 'Tech2'],
  architecture: 'Microservices',
  highlights: ['Feature1', 'Feature2'],
  github: 'https://github.com/repo',
  demo: 'https://demo.com',
  featured: true,
  color: 'from-blue-500 to-cyan-400',
}
```

### Adding Certifications

Edit `components/sections/certifications.tsx` and add to the `certifications` array.

### Updating Technologies

Edit `components/sections/technologies.tsx` to modify the tech stack categories and items.

## Deployment

For Azure deployment instructions, see [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md).

## License

MIT License - feel free to use this template for your own portfolio.

## Contact

- Email: ddov0811@gmail.com
- LinkedIn: [daniel-david-ortiz-villanueva](https://www.linkedin.com/in/daniel-david-ortiz-villanueva-7a8053257)
- GitHub: [DanielOrtiz08](https://github.com/DanielOrtiz08)
