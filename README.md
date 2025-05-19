# cal-sync
Synchronize multiple Google Calendars

![Screenshot 2025-05-20 at 1 32 02 AM](https://github.com/user-attachments/assets/3a54cf21-f30b-425f-9ef8-407c117eaa35)

![Screenshot 2025-05-20 at 1 32 31 AM](https://github.com/user-attachments/assets/5b222b08-d67d-4715-9135-f1c363ea1014)

----


#### Local Setup:

#### 1. Copy Environment Variables to your local `.env` file:

```
cp .env.example .env
```

#### 2. Create Google OAuth Client and setup credentials in `.env` file.

#### 3. Install packages and dependencies:

```
npm install 
```



#### 3. start project with: 
```
npm run dev
```

- it will start postgres docker container.

NOTE: you can configure database variables in `scripts/start.sh` (if required).
