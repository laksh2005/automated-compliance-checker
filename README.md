# 🎯 Automated Compliance Checker

Welcome to our compliance checking tool for e-commerce products. We built this to make life easier for everyone dealing with Legal Metrology rules in online marketplaces.

## What's This All About?

Ever wondered how to make sure all those product listings follow the legal requirements? That's exactly what we're solving here! Our tool automatically checks if products on e-commerce platforms properly display all the required information - you know, things like product names, quantities, prices, and where they're made.

## Cool Things It Can Do

### 🔍 Smart Product Scanning
We've made checking products super easy:
- Just feed in your product listings through our API
- Watch as it processes everything in real-time
- Get standardized results you can actually use
- Handle tons of products at once (yeah, it's that powerful!)

### 📊 Beautiful Analytics Dashboard
We're pretty proud of this one:
- See exactly how well products are complying with rules
- Track which brands are doing great (and not so great)
- Check out compliance trends across different regions
- Get the full picture with our interactive charts

### ⚙️ The Brains Behind It
Our system checks everything that matters:
- All the manufacturer details
- Product quantities
- Pricing information
- Customer service contacts
- Manufacturing dates
- Country of origin

Plus, we've made it super clear to understand with three simple levels:
- 🟢 All Good (100% compliant)
- 🟡 Needs a Look (50-99% compliant)
- 🔴 Fix Needed (below 50%)

### 💻 User-Friendly Interface
We've put a lot of thought into making this easy to use:
- Clean, modern look (thanks to Tailwind CSS!)
- Works great on any screen size
- Find what you need, fast
- Sort and filter data however you want
- Export your reports in CSV or JSON
- Tables that make sense and are easy to use

### 🚀 Built for Scale
Because we know you mean business:
- Handles large amounts of data with ease
- Keeps your data safe and secure
- Fast and responsive, always
- Catches errors before they become problems
- Keeps detailed logs of everything

## 🛠️ Tech We Used

We picked the best tools for the job:
- React 19.1.1 for the core functionality
- Vite 7.1.2 to keep things speedy
- Tailwind CSS 4.1.13 for those slick looks
- Recharts 3.2.0 for beautiful data visualization
- Framer Motion 12.23.12 for smooth animations
- Lucide React 0.543.0 for crisp icons
- React Router DOM 7.8.2 for seamless navigation

## 🚀 Getting Started

Want to run this yourself? Here's how:

1. First, grab the code:
   ```bash
   git clone https://github.com/laksh2005/automated-compliance-checker.git
   cd automated-compliance-checker
   ```

2. Install everything you need:
   ```bash
   npm install
   ```

3. Start it up:
   ```bash
   npm run dev
   ```

4. Ready for the real world? Build it:
   ```bash
   npm run build
   ```

## 📁 How It's Organized

Here's how we've laid everything out:

```
automated-compliance-checker/
├── public/                # Where we keep the data
│   ├── combined.json     # Everything in one place
│   ├── compliance.json   # The rules we check against
│   ├── final.json       # Results after processing
│   └── stateCounts.json # Data for our maps
├── src/
│   ├── components/      # Building blocks of our UI
│   │   ├── Dashboard.jsx
│   │   ├── Flagged.jsx
│   │   └── Map.jsx
│   ├── hooks/          # React magic happens here
│   │   └── useData.jsx
│   └── scripts/        # Helper scripts
└── package.json
```

## 📊 How We Score Products

We keep it simple but effective. Each product gets checked for:
1. Is all the required info there?
2. Is it formatted correctly?
3. Is the information complete?
4. Does everything match up?

We then put products into three easy-to-understand categories:
- 🟢 **Good to Go**: Everything's perfect
- 🟡 **Need a Look**: Some minor things to fix
- 🔴 **Needs Work**: Major issues to address

## 🤝 Want to Help?

We'd love your input! Here's how you can join in:

1. Fork it
2. Create your feature branch: `git checkout -b feature/CoolNewThing`
3. Make your changes and commit: `git commit -m 'Add CoolNewThing'`
4. Push it: `git push origin feature/CoolNewThing`
5. Open a Pull Request and let's talk!

## 📜 License

MIT Licensed - which means you can do pretty much anything with this (just keep the license file around!)

## 🙏 Thank You

Big shoutout to:
- The awesome folks at the Ministry of Consumer Affairs, Food & Public Distribution
- The amazing React and Vite communities
- Everyone who's contributed to this project

---
Got questions or ideas? Open an issue - we'd love to hear from you! 💬