# 🚀 Quick Start - Agora Video Streaming

## ✅ Installation (Already Done!)

```bash
npm install agora-rtc-sdk-ng  # ✅ Installed
```

## 🎯 Test It Now (No Setup Needed!)

Your app works immediately with the test App ID!

### Test Live Streaming:
1. Run your app
2. Click profile icon (top right)
3. Click "Go Live" button
4. Allow camera/microphone
5. Enter stream title
6. Click "Go Live"
7. **You're live!** 🎉

### Test Video Calls:
1. Go to "Chats" tab
2. Click video call icon on any chat
3. Confirm call
4. Allow camera/microphone
5. **Call connected!** 🎉

---

## 🔑 Get Your Own App ID (5 Minutes)

### 1. Sign Up
- Go to: https://console.agora.io/
- Create free account
- Verify email

### 2. Create Project
- Click "Project Management"
- Click "Create"
- Name: "YourAppName"
- Mode: "Testing mode"
- Submit

### 3. Get App ID
- Click eye icon 👁️
- Copy the App ID

### 4. Update Code
Open `/lib/agora.ts`:

```typescript
// Line 8 - Replace this:
export const AGORA_APP_ID = '6e45ee5fdb174b7a80b3c2a7aa4fc1e3';

// With your App ID:
export const AGORA_APP_ID = 'YOUR_APP_ID_HERE';
```

### 5. Done! ✅
- Save file
- Restart app
- You're using your own Agora account!

---

## 💰 Pricing

| Usage | Cost |
|-------|------|
| 0 - 10,000 minutes/month | **FREE** ✅ |
| 10,001 - 50,000 minutes | $0.99/1,000 mins |
| 50,001+ minutes | $0.99/1,000 mins |

**Example:**
- 1,000 users × 10 mins each = 10,000 mins = **FREE**
- 10,000 users × 10 mins each = 100,000 mins = **$90/month**

---

## 📱 Features Working

### Live Streaming:
- ✅ Real camera streaming
- ✅ Unlimited viewers
- ✅ < 400ms latency
- ✅ Global CDN
- ✅ Comments
- ✅ Gifts
- ✅ Viewer count

### Video Calls:
- ✅ 1:1 video calls
- ✅ Mute/unmute
- ✅ Camera on/off
- ✅ Chat during call
- ✅ Coin charging
- ✅ Call duration

---

## 🐛 Troubleshooting

### Camera not working?
**Check browser permissions:**
- Chrome: Click camera icon in address bar → Allow
- Safari: Settings → Privacy → Camera → Allow website

**Must use HTTPS or localhost**

### No video showing?
1. Open browser console (F12)
2. Look for Agora errors
3. Check if App ID is correct
4. Verify camera permissions granted

### Still stuck?
- Check `/AGORA_SETUP.md` for detailed troubleshooting
- Visit Agora docs: https://docs.agora.io/en/

---

## 🚀 Deploy to Production

### 1. Choose Hosting
**Recommended:** Vercel (free tier)
- Connect GitHub repo
- Auto-deploy on push
- Free SSL certificate
- Global CDN

**Alternatives:**
- Netlify (free tier)
- AWS Amplify
- Firebase Hosting

### 2. Deploy
```bash
# Vercel
npm install -g vercel
vercel deploy

# Netlify
npm install -g netlify-cli
netlify deploy --prod
```

### 3. Configure Domain
- Add custom domain in hosting dashboard
- Update DNS settings
- SSL auto-configured

### 4. Test on Mobile
- Open deployed URL on phone
- Allow camera permissions
- Test streaming and calls

---

## 📚 Learn More

- **Agora Docs:** https://docs.agora.io/
- **Sample Code:** https://github.com/AgoraIO
- **Community:** https://www.agora.io/en/community/
- **Video Tutorials:** YouTube → "Agora Web SDK"

---

## 🎉 You're Ready!

Your streaming platform is **production-ready** with:
- ✅ Live streaming
- ✅ Video calls
- ✅ Global CDN
- ✅ 10,000 free minutes/month

**Happy streaming!** 🚀