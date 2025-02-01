export const dynamicTypographyCssString = `
:root {
  --text-xs: 0.8rem;
  --text-sm: 1.2rem;
  --text-md: 1.6rem;
  --text-lg: 2rem;
  --text-xl: 2.4rem;
  --text-2xl: 3.2rem;
  --text-3xl: 4rem;
  --text-4xl: 4.8rem;
  --text-5xl: 5.2rem;
  --text-6xl: 6rem;
}

@media (min-width: 768px) {
  :root {
    --text-xs: 1.2rem;
    --text-sm: 1.6rem;
    --text-md: 2rem;
    --text-lg: 2.4rem;
    --text-xl: 2.8rem;
    --text-2xl: 3.6rem;
    --text-3xl: 4.8rem;
    --text-4xl: 5.6rem;
    --text-5xl: 6.4rem;
    --text-6xl: 7.2rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --text-xs: 1.4em;
    --text-sm: 2rem;
    --text-md: 2.6rem;
    --text-lg: 3.2rem;
    --text-xl: 3.8rem;
    --text-2xl: 5rem;
    --text-3xl: 6.2rem;
    --text-4xl: 7.4rem;
    --text-5xl: 8.6rem;
    --text-6xl: 9.8rem;
  }
}

@media (min-width: 1440px) {
  :root {
    --text-xs: 1.8rem;
    --text-sm: 2.6rem;
    --text-md: 3.4rem;
    --text-lg: 4.2rem;
    --text-xl: 5rem;
    --text-2xl: 6.6rem;
    --text-3xl: 8.2rem;
    --text-4xl: 9.8rem;
    --text-5xl: 10.4rem;
    --text-6xl: 12rem;
  }
}

.text-xs {
  font-size: var(--text-xs);
}
.text-sm {
  font-size: var(--text-sm);
}
.text-md {
  font-size: var(--text-md);
}
.text-lg {
  font-size: var(--text-lg);
}
.text-xl {
  font-size: var(--text-xl);
}
.text-2xl {
  font-size: var(--text-2xl);
}
.text-3xl {
  font-size: var(--text-3xl);
}
.text-4xl {
  font-size: var(--text-4xl);
}
.text-5xl {
  font-size: var(--text-5xl);
}
.text-6xl {
  font-size: var(--text-6xl);
}
`;
