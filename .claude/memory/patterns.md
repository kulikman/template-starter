# Patterns — What Works in This Project

> Living document of patterns discovered during development.
> When something works well, document it here so it's reused consistently.
> When something causes problems, document the anti-pattern too.

---

## Established Patterns

### Supabase Auth Check (Server)
```ts
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getAuthUser() {
  const supabase = createServerClient(...)
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) throw new Error('Unauthorized')
  return user
}
```

### API Route Pattern
```ts
export async function POST(req: Request) {
  try {
    const body = InputSchema.parse(await req.json())
    const user = await getAuthUser()
    const result = await processRequest(body, user.id)
    return Response.json({ data: result })
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: 'Invalid input' }, { status: 400 })
    }
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

### Conditional Tailwind Classes
```ts
import { cn } from '@/lib/utils'

// Use cn() for all conditional class merging
<Button className={cn(
  'base-styles',
  isActive && 'active-styles',
  variant === 'ghost' && 'ghost-styles'
)} />
```

---

## Anti-Patterns (Do Not Use)

### ❌ Fetching in useEffect
```ts
// DON'T — causes waterfall, no streaming, no caching
useEffect(() => {
  fetch('/api/data').then(...)
}, [])

// DO — Server Component with direct async/await
async function Page() {
  const data = await getData()
  return <Component data={data} />
}
```

### ❌ Untyped Supabase queries
```ts
// DON'T — loses type safety
const { data } = await supabase.from('users').select('*')

// DO — explicit column selection + generated types
const { data } = await supabase
  .from('users')
  .select('id, email, created_at')
  .returns<User[]>()
```

---

_Add new patterns as they're discovered_
