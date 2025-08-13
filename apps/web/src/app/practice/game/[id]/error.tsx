"use client";

import { LazyRedirect } from "@router/LazyRedirect";

export default function ErrorPage() {
  return <LazyRedirect redirectName="연습모드" redirectPath="/single" />;
}
