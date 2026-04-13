# 📡 Service Radar

🚀 *Scan. Detect. Install.*

Service Radar is a full-stack application that detects whether popular apps (food delivery, shopping, logistics, and taxi services) are available in a user’s location.

It uses real-time browser automation to simulate user interaction with platforms and determine serviceability — eliminating guesswork before installing apps.

---

## 🔍 Features

* 📍 Location-based availability detection
* 🤖 Real-time checking using Playwright (browser automation)
* 📂 Multi-category support:

  * 🍔 Food Delivery (Zomato, Swiggy, EatSure)
  * 👕 Shopping (Myntra, Ajio, Amazon, Flipkart)
  * 🚚 Logistics (Porter, Dunzo, Borzo)
  * 🚖 Taxi Services (Uber, Ola, Rapido)
* 🔎 Search specific apps
* 📊 Smart filtering (available / not available)
* 📱 Direct install links (Play Store / App Store)
* 🎨 Retro terminal-style UI with radar-inspired design

---

## ⚙️ Tech Stack

**Frontend**

* React

**Backend**

* FastAPI

**Automation / Scraping**

* Playwright

**Performance**

* Redis (caching)

---

## 📡 How It Works

1. User enters location (city or pincode)
2. Backend uses Playwright to:

   * Open service websites
   * Simulate location input
   * Detect availability dynamically
3. Results are processed and returned
4. UI displays:

   * Available apps
   * Not available apps
   * Install options

---

## 🖥️ Project Structure

```bash
service-radar/
├── frontend/      # React UI
├── backend/       # FastAPI + Playwright
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/LIONELcomet/SERVICE-RADAR.git
cd SERVICE-RADAR
```

---

### 2. Run Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 3. Run Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🎨 UI Concept

Service Radar is designed with a **black & white retro terminal theme**, inspired by radar systems:

* 📡 Flickering title (old billboard style)
* 🧭 Dotted grid background
* 🛵 Floating icons (location, scooter, map)
* ⌨️ Terminal-style input/output

---

## 🚧 Current Improvements

* ⚡ Optimizing performance and response time
* 🧠 Adding intelligent recommendation system
* 🚀 Enhancing UI animations and radar effects

---

## 💡 Future Enhancements

* AI-based app recommendation
* Faster caching strategies
* Live radar scan animation
* Voice search support

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

---

## 📬 Contact

If you like this project or have feedback, feel free to connect!

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
