#!/bin/bash

# Adopt The Ayurveda Website Deployment Script
# This script helps deploy the website to various hosting platforms

echo "🌿 Adopt The Ayurveda Website Deployment Helper"
echo "================================================"

# Check if files exist
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found in current directory"
    exit 1
fi

if [ ! -f "styles.css" ]; then
    echo "❌ Error: styles.css not found in current directory"
    exit 1
fi

if [ ! -f "script.js" ]; then
    echo "❌ Error: script.js not found in current directory"
    exit 1
fi

echo "✅ All required files found!"

echo ""
echo "🚀 Choose your hosting option:"
echo "1. GitHub Pages"
echo "2. Netlify (Drag & Drop)"
echo "3. Vercel"
echo "4. Traditional Web Hosting"
echo "5. Local Development Server"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "📚 GitHub Pages Deployment:"
        echo "1. Create a new GitHub repository"
        echo "2. Upload all files to the repository"
        echo "3. Go to Settings > Pages"
        echo "4. Select source branch (usually 'main')"
        echo "5. Your site will be available at https://username.github.io/repository-name"
        echo ""
        echo "💡 Tip: You can also use GitHub CLI to create and push to a repository"
        ;;
    2)
        echo ""
        echo "🌐 Netlify Deployment:"
        echo "1. Go to https://netlify.com"
        echo "2. Drag and drop this folder to deploy"
        echo "3. Your site will be live instantly with a custom URL"
        echo "4. You can add a custom domain later"
        echo ""
        echo "💡 Tip: Netlify also supports Git integration for automatic deployments"
        ;;
    3)
        echo ""
        echo "⚡ Vercel Deployment:"
        echo "1. Go to https://vercel.com"
        echo "2. Import your GitHub repository or upload files"
        echo "3. Deploy with one click"
        echo "4. Get a custom URL and domain options"
        echo ""
        echo "💡 Tip: Vercel offers excellent performance and automatic HTTPS"
        ;;
    4)
        echo ""
        echo "🏠 Traditional Web Hosting:"
        echo "1. Upload all files to your web hosting provider"
        echo "2. Ensure index.html is in the root directory"
        echo "3. Configure your domain to point to the hosting"
        echo ""
        echo "💡 Tip: Make sure your hosting provider supports static websites"
        ;;
    5)
        echo ""
        echo "🖥️ Local Development Server:"
        echo "Starting local server..."
        
        # Check if Python is available
        if command -v python3 &> /dev/null; then
            echo "Starting Python HTTP server on port 8000..."
            echo "Open http://localhost:8000 in your browser"
            python3 -m http.server 8000
        elif command -v python &> /dev/null; then
            echo "Starting Python HTTP server on port 8000..."
            echo "Open http://localhost:8000 in your browser"
            python -m http.server 8000
        elif command -v node &> /dev/null; then
            echo "Starting Node.js server..."
            echo "Installing serve globally..."
            npm install -g serve
            echo "Open http://localhost:3000 in your browser"
            serve .
        elif command -v php &> /dev/null; then
            echo "Starting PHP server on port 8000..."
            echo "Open http://localhost:8000 in your browser"
            php -S localhost:8000
        else
            echo "❌ No suitable server found. Please install Python, Node.js, or PHP"
            echo "Alternatively, simply open index.html in your web browser"
        fi
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and select 1-5."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment instructions completed!"
echo ""
echo "📞 For support, contact: +91 9654136674"
echo "🌐 Website: Adopt The Ayurveda"
echo "" 