# ========================================
# 🚀 GUIDE DÉPLOIEMENT VERCEL - StreamSUI
# ========================================

Ce guide couvre le déploiement complet de l'application StreamSUI sur Vercel avec OAuth Twitch fonctionnel.

## 📋 Prérequis

- [ ] Compte Vercel (https://vercel.com)
- [ ] Compte GitHub avec le repo StreamSUI pushez
- [ ] Application Twitch créée sur https://dev.twitch.tv/console/apps
- [ ] Client ID et Client Secret Twitch en main

---

## 🏗️ PARTIE 1: Déploiement du Backend API

### Étape 1.1: Préparer le Backend

```bash
cd apps/api

# Copier le template de variables d'environnement
cp .env.example .env

# Éditer .env avec tes vraies credentials
nano .env
```

Remplir :
```env
TWITCH_CLIENT_ID=ton_client_id_ici
TWITCH_CLIENT_SECRET=ton_client_secret_ici
TWITCH_REDIRECT_URI=https://TON-API.vercel.app/api/auth/twitch/callback
FRONTEND_URL=https://TON-APP.vercel.app
```

⚠️ **Note**: Tu mettras les vraies URLs Vercel après le premier déploiement.

### Étape 1.2: Déployer le Backend sur Vercel

**Option A: Via Dashboard Vercel**

1. Va sur https://vercel.com/new
2. Importe ton repo GitHub
3. Configure le projet:
   - **Project Name**: `streamsui-api`
   - **Framework Preset**: Other
   - **Root Directory**: `apps/api`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

4. Variables d'environnement (dans Settings → Environment Variables):
   ```
   NODE_ENV = production
   TWITCH_CLIENT_ID = [ton_client_id]
   TWITCH_CLIENT_SECRET = [ton_client_secret]  
   TWITCH_REDIRECT_URI = https://streamsui-api.vercel.app/api/auth/twitch/callback
   FRONTEND_URL = https://streamsui.vercel.app
   ```

5. Clique sur **Deploy**

6. Récupère l'URL de déploiement (ex: `https://streamsui-api.vercel.app`)

**Option B: Via CLI Vercel**

```bash
cd apps/api

# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Déployer
vercel --prod

# Ajouter les variables d'environnement
vercel env add TWITCH_CLIENT_ID
vercel env add TWITCH_CLIENT_SECRET
vercel env add TWITCH_REDIRECT_URI
vercel env add FRONTEND_URL

# Redéployer avec les variables
vercel --prod
```

### Étape 1.3: Vérifier le Backend

Teste le health check:
```bash
curl https://streamsui-api.vercel.app/health
```

Tu dois voir:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "uptime": 123,
  "environment": "production"
}
```

---

## 🎨 PARTIE 2: Déploiement du Frontend

### Étape 2.1: Mettre à Jour les Variables d'Environnement

```bash
cd apps/web

# Éditer .env.local
nano .env.local
```

Mettre à jour avec les URLs de production:
```env
# Backend API (URL obtenue à l'étape 1.2)
VITE_API_URL=https://streamsui-api.vercel.app

# Twitch OAuth
VITE_TWITCH_CLIENT_ID=ton_client_id_ici
VITE_TWITCH_REDIRECT_URI=https://streamsui-api.vercel.app/api/auth/twitch/callback

# Sui Network
VITE_SUI_NETWORK=devnet

# zkLogin
VITE_ZKLOGIN_PROVER_URL=https://prover-dev.mystenlabs.com/v1
VITE_ZKLOGIN_SALT_SERVICE_URL=https://salt.api.mystenlabs.com/get_salt
```

### Étape 2.2: Déployer le Frontend sur Vercel

1. Va sur https://vercel.com/new
2. Importe le même repo GitHub
3. Configure:
   - **Project Name**: `streamsui`
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/web`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `build`
   - **Install Command**: `pnpm install`

4. Variables d'environnement:
   ```
   VITE_API_URL = https://streamsui-api.vercel.app
   VITE_TWITCH_CLIENT_ID = [ton_client_id]
   VITE_TWITCH_REDIRECT_URI = https://streamsui-api.vercel.app/api/auth/twitch/callback
   VITE_SUI_NETWORK = devnet
   VITE_ZKLOGIN_PROVER_URL = https://prover-dev.mystenlabs.com/v1
   VITE_ZKLOGIN_SALT_SERVICE_URL = https://salt.api.mystenlabs.com/get_salt
   ```

5. Déployer

6. Récupère l'URL (ex: `https://streamsui.vercel.app`)

---

## 🎮 PARTIE 3: Configuration Twitch OAuth

### Étape 3.1: Mettre à Jour l'App Twitch

1. Va sur https://dev.twitch.tv/console/apps
2. Clique sur ton app "StreamSUI" (ou autre nom)
3. Dans **OAuth Redirect URLs**, ajoute:
   ```
   https://streamsui-api.vercel.app/api/auth/twitch/callback
   ```
   
   ⚠️ **IMPORTANT**: L'URL doit pointer vers le **BACKEND**, pas le frontend !

4. Sauvegarde

### Étape 3.2: Mettre à Jour les Variables Backend

Retourne dans Vercel → Projet `streamsui-api` → Settings → Environment Variables

Modifie:
```
FRONTEND_URL = https://streamsui.vercel.app (URL obtenue à l'étape 2.2)
```

Redéploie:
```bash
# Via dashboard: Deployments → ... → Redeploy
# Ou via CLI:
cd apps/api
vercel --prod
```

---

## ✅ PARTIE 4: Test du Flow OAuth

### 4.1 Test Manuel

1. Ouvre `https://streamsui.vercel.app`
2. Connecte ton wallet Sui (Slush/zkLogin)
3. Choisis un rôle (Streamer ou Viewer)
4. Clique sur "Connexion Twitch"
5. Autorise l'application sur Twitch
6. Tu es redirigé vers Twitch → Backend → Frontend
7. Ton username Twitch apparaît dans le header

### 4.2 Vérifier les Logs

**Backend Logs** (Vercel):
- Va sur Vercel → `streamsui-api` → Functions
- Clique sur `/api/auth/twitch/callback`
- Regarde les logs en temps réel

**Frontend Console**:
- Ouvre DevTools → Console
- Cherche `[TwitchButton]` et `[TwitchCallback]` logs

---

## 🐛 PARTIE 5: Troubleshooting

### Erreur: "Invalid redirect_uri"

**Cause**: L'URL de callback ne correspond pas exactement

**Solution**:
1. Vérifie dans Twitch Console: `https://streamsui-api.vercel.app/api/auth/twitch/callback`
2. Vérifie dans Vercel Backend env: `TWITCH_REDIRECT_URI`
3. Pas de trailing slash !

### Erreur: CORS

**Cause**: Le frontend ne peut pas appeler le backend

**Solution**:
- Vérifie `FRONTEND_URL` dans le backend
- Redéploie le backend après changement

### Erreur: "Client Secret incorrect"

**Cause**: Client Secret mal copié

**Solution**:
- Régénère le secret dans Twitch Console
- Copie-colle soigneusement dans Vercel Backend env
- Redéploie

### Timeout après OAuth

**Cause**: Le backend n'arrive pas à récupérer le token

**Solution**:
- Vérifie les logs backend Vercel
- Assure-toi que `TWITCH_CLIENT_ID` et `TWITCH_CLIENT_SECRET` sont corrects

---

## 📊 PARTIE 6: URLs Finales

À la fin du déploiement, tu auras:

| Service | URL | Utilisé pour |
|---------|-----|--------------|
| **Frontend** | `https://streamsui.vercel.app` | Application web principale |
| **Backend API** | `https://streamsui-api.vercel.app` | OAuth Twitch + API |
| **Health Check** | `https://streamsui-api.vercel.app/health` | Vérifier que l'API fonctionne |
| **OAuth Callback** | `https://streamsui-api.vercel.app/api/auth/twitch/callback` | Callback Twitch OAuth |

---

## 🔄 PARTIE 7: Workflow de Développement

### Pour Tester en Local

```bash
# Terminal 1: Backend
cd apps/api
pnpm dev
# → http://localhost:3001

# Terminal 2: Frontend
cd apps/web
pnpm dev:https
# → https://localhost:3000
```

### Pour Déployer des Changements

```bash
# Commit et push
git add .
git commit -m "Update feature X"
git push

# Vercel redéploie automatiquement les deux apps
```

### Variables d'Environnement par Environnement

| Environnement | Frontend URL | Backend URL | Twitch Redirect |
|--------------|--------------|-------------|-----------------|
| **Local** | https://localhost:3000 | http://localhost:3001 | http://localhost:3001/api/auth/twitch/callback |
| **Production** | https://streamsui.vercel.app | https://streamsui-api.vercel.app | https://streamsui-api.vercel.app/api/auth/twitch/callback |

---

## 🎉 Checklist Finale

- [ ] Backend déployé sur Vercel avec variables d'env
- [ ] Frontend déployé sur Vercel avec variables d'env
- [ ] Twitch OAuth Redirect URI mis à jour avec l'URL backend
- [ ] Health check backend fonctionne
- [ ] Test OAuth complet: connexion → autorisation → retour → username affiché
- [ ] Logs backend vérifiés (pas d'erreurs)
- [ ] Sessions persistent après refresh
- [ ] Déconnexion Twitch fonctionne

---

**🚀 Félicitations ! StreamSUI est maintenant en production avec OAuth Twitch fonctionnel !**
