# Personal Portfolio Application


## Overview

A modern, responsive portfolio application built with Vue 3 and TypeScript, showcasing my projects and professional
experience. The application features a dynamic content management system, responsive design, and seamless user
experience across all devices. Originally built with Vue 2 this project has been upgraded to Vue 3 in an effort to
modernize the codebase.

You can view the live application at [erickboyzo.dev](https://erickboyzo.dev).

## Key Features

- **Modern Tech Stack**: Built with Vue 3, TypeScript, Vuetify 3, and Vite
- **Dynamic Content**: Integrates with GitConnected API for automated portfolio updates and with JSON Silo API for site metadata updates.
- **Responsive Design**: Fully responsive layout with mobile-first approach
- **Dark/Light Theme**: Supports theme switching for better user experience
- **Contact Form**: Interactive contact form with Cloudflare Workers backend
- **Project Showcase**: Dynamic project display with pagination and filtering
- **Performance Optimized**: Implements lazy loading and code splitting
- **Type Safety**: Full TypeScript implementation for robust code quality

## Technical Stack

- **Frontend**: Vue 3, TypeScript, Vuetify 3
- **Build Tool**: Vite
- **State Management**: Pinia with persistence
- **Styling**: SCSS, Vuetify components
- **Backend**: Cloudflare Workers
- **APIs**: [GitConnected](https://gitconnected.com), [JSON Silo API](https://jsonsilo.com/)
- **Icons**: Material Design Icons, Devicons

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run unit tests
npm run test:unit

# Lint and fix files
npm run lint
```

## Deployment

The application is configured for deployment on Cloudflare Pages with integrated Workers for backend functionality.

## Project Structure

```
├── src/
│   ├── components/   # Reusable Vue components
│   ├── pages/        # Page components
│   ├── plugins/      # Vue plugins
│   ├── stores/       # Pinia state management
│   ├── interfaces/   # TypeScript interfaces
│   ├── router/       # Vue Router configuration
│   ├── utils/        # Utility functions
│   └── assets/       # Static assets
├── functions/        # Cloudflare Workers functions
└── public/           # Public static files
```

## Features in Development

- [ ] Project filtering by technology
- [ ] Enhanced animations
- [ ] SEO optimization