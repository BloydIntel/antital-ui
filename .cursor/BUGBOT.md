# Bugbot — Atomic UI structure (this repo)

## Layout

- Feature UI lives under `src/components/<feature>/` with **`atoms/`**, **`molecules/`**, and **`organisms/`** (use the folders that match the change; not every feature needs all three).
- **Shared primitives** from shadcn/Radix stay in **`src/components/ui/`** — treat that as the cross-app “base” layer, not feature-specific atoms.
- **Routes** under `src/app/` should mostly **compose organisms** (or thin page-level wrappers). Avoid growing large, bespoke UI trees directly in `page.tsx` when they belong in `components/`.

## Layer rules (dependency direction)

- **`atoms`**: smallest pieces (icons, labels, single controls) with **no** imports from `molecules` or `organisms` in the same feature.
- **`molecules`**: small compositions (form row + label, cards, input groups) — may use `atoms`, `ui/`, and shared libs; **not** feature `organisms`.
- **`organisms`**: sections, multi-step blocks, sidebars — may use `molecules`, `atoms`, and `ui/`.
- **Do not** invert this (e.g. an atom importing an organism, or molecules depending on organisms).

## PR review hints

- Flag **new** large UI dumped under `src/app/**` or loose `src/components/*.tsx` when the same code fits `src/components/<feature>/{atoms,molecules,organisms}/`.
- Flag **cross-feature** imports that create tight coupling unless the dependency is clearly shared (prefer shared `molecules`/`*` in a neutral feature folder or `ui/` when it is truly generic).
- **Naming**: match the existing convention in the same folder (this repo uses both PascalCase and kebab-case in different areas — do not mix styles within one folder).
