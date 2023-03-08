#!/bin/bash

cd /app
cp /tmp/environments/.env ./.env
npx prisma generate
npm run start