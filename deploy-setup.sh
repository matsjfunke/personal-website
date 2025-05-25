#!/bin/bash

# VPS Setup Script for Personal Website
# Run this script on your VPS to set up the initial deployment

set -e

echo "🚀 Setting up VPS for hosting..."

echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "🌳 Installing Git..."
sudo apt install -y git

echo "🐳 Installing Docker & Docker Compose..."
sudo apt-get install -y docker.io docker-compose
sudo usermod -aG docker $USER

echo "🧱 Setting up firewall..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw --force enable

echo "📁 Creating deployment directory..."
mkdir -p /opt/personal-website
cd /opt/personal-website

echo "📥 Cloning repository..."
git clone https://github.com/matsjfunke/personal-website.git .

echo "🚀 Starting services..."
docker-compose up -d