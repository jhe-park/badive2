'use client';

export function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
