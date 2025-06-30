"use client";

import { LazyRedirect } from "@router/LazyRedirect";

export default function ErrorPage() {
  return <LazyRedirect redirectName="싱글게임" redirectPath="/single" />;
}
