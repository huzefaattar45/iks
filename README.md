# Cipher Vault Escape

Build a premium, futuristic, cyber-themed interactive web application called "CIPHER VAULT".

CIPHER VAULT is a modular arithmetic and cryptography escape-room game.

The player is trapped inside a virtual security vault and must solve a sequence of mathematical and cryptographic puzzles to unlock each security level and ultimately escape.

IMPORTANT:

This phase is ONLY for the frontend UI/UX.

Do NOT implement real encryption algorithms, backend APIs, authentication, database logic, or complex game logic.

Use mock data and placeholder interactions where necessary.

The UI must be structured cleanly so that game logic can later be connected easily.

TECH STACK:

- React

- Vite

- Tailwind CSS

- React Router

- Lucide React icons

- Framer Motion for animations

- Component-based architecture

- Responsive design

==================================================

1. DESIGN DIRECTION

==================================================

Create a sophisticated cyber-security escape-room aesthetic.

The design should feel:

- futuristic

- mysterious

- premium

- intelligent

- immersive

- minimal

- elegant

- game-like

Avoid:

- childish educational graphics

- excessive neon

- overly bright colors

- generic dashboard templates

- cartoonish elements

- clutter

- excessive glassmorphism

Use subtle glass panels, glowing borders, gradients, shadows and smooth animations.

COLOR PALETTE:

Background:

#070B14

#0B1020

Primary:

#7C3AED

Secondary:

#6366F1

Accent:

#22D3EE

Success:

#22C55E

Warning:

#F59E0B

Error:

#EF4444

Text:

#F8FAFC

Muted:

#94A3B8

Use gradients sparingly.

TYPOGRAPHY:

Use a modern geometric sans-serif font.

Headings:

bold / semi-bold

Body:

clean and highly readable.

Numbers and mathematical expressions:

use a subtle monospace font.

==================================================

2. GLOBAL UI

==================================================

Create a consistent application shell.

Desktop:

- left sidebar navigation

- main content area

- top status bar

Mobile:

- bottom navigation or collapsible sidebar

Sidebar:

Logo:

CIPHER

VAULT

Icon:

minimal lock/cipher symbol

Navigation:

Dashboard

Mission

Levels

Cipher Lab

Solution Log

Leaderboard

About

Bottom of sidebar:

PLAYER

"Guest Player"

Status:

"MISSION ACTIVE"

Use icons from Lucide React.

Sidebar should have:

- active state

- subtle glow

- hover animations

- smooth transitions

Top bar:

Left:

breadcrumb / current section

Right:

- timer

- lives

- score

- player avatar

Example:

04:37

♥ ♥ ♥

920 XP

==================================================

3. LANDING PAGE

==================================================

Create a cinematic landing page.

Hero section:

Small badge:

"CLASSIFIED // SECURITY SYSTEM"

Main heading:

"BREAK THE CODE.

ESCAPE THE VAULT."

Subtitle:

"Master modular arithmetic, crack encrypted messages, and unlock every security layer before time runs out."

Primary CTA:

START MISSION

Secondary CTA:

HOW IT WORKS

Hero visual:

Create a large futuristic digital vault interface.

Show:

- circular cipher wheel

- rotating rings

- small mathematical symbols

- encrypted characters

- subtle grid

- glowing lock

- animated particles

Do not make it visually noisy.

Below hero:

Three feature cards:

01

MODULAR TIME

Solve cyclic problems involving clocks and calendars.

02

CRYPTIC LOGIC

Encrypt and decrypt messages using modular arithmetic.

03

ESCAPE

Complete every security layer and unlock the final vault.

Add a "How it works" section:

DISCOVER → SOLVE → DECRYPT → UNLOCK

Footer:

CIPHER VAULT

"Where mathematics meets cybersecurity."

==================================================

4. MISSION BRIEFING PAGE

==================================================

Create an immersive mission briefing.

Header:

MISSION BRIEFING

SECURITY PROTOCOL: OMEGA

Main story card:

"SYSTEM BREACH DETECTED"

Text:

"You have entered the Cipher Vault.

Five security layers protect the final exit.

Each layer is powered by a different cyclic or cryptographic mechanism.

Solve the puzzles.

Understand the pattern.

Break the code.

Escape."

Show five security layers visually:

01 CLOCK LOCK

Modulo 12

02 CALENDAR LOCK

Modulo 7

03 RECURRING EVENT

Cyclic Scheduling

04 ENCRYPTION CHAMBER

Modulo 26

05 DECRYPTION CORE

Cipher Logic

Each card should initially appear locked except Level 1.

CTA:

BEGIN MISSION

==================================================

5. DASHBOARD PAGE

==================================================

This is the main player dashboard.

Header:

"MISSION CONTROL"

Subtitle:

"Your path to the vault."

Top stats:

CURRENT LEVEL

1 / 5

TIME

04:37

SCORE

920

LIVES

3

Main card:

CURRENT OBJECTIVE

"THE TIME LOCK"

Description:

"The vault clock has shifted. Calculate its next position using modular arithmetic."

Button:

CONTINUE MISSION

Progress section:

MISSION PROGRESS

Show five connected nodes:

01 Clock

02 Calendar

03 Events

04 Encrypt

05 Decrypt

Completed:

green

Current:

purple glow

Locked:

dark gray

Below:

QUICK ACCESS

Cards:

- Continue Mission

- Cipher Lab

- Solution Log

Add a "Recent Activity" section.

Mock activity:

✓ Level 1 unlocked

✓ Clock puzzle solved

! Level 2 awaiting completion

==================================================

6. LEVELS PAGE

==================================================

Create a visual level-selection screen.

Header:

SECURITY LEVELS

Subtitle:

"Every lock is powered by a different mathematical pattern."

Create five large level cards.

LEVEL 01

THE TIME LOCK

Modulo 12

Status:

AVAILABLE

LEVEL 02

THE CALENDAR LOCK

Modulo 7

Status:

LOCKED

LEVEL 03

THE RECURRING SIGNAL

Repeated Events

Status:

LOCKED

LEVEL 04

THE ENCRYPTION CHAMBER

Modulo 26

Status:

LOCKED

LEVEL 05

THE DECRYPTION CORE

Cipher Logic

Status:

LOCKED

Each card should contain:

- large number

- icon

- description

- difficulty indicator

- status

- enter button

Locked cards should visually look inaccessible.

==================================================

7. LEVEL 1 PAGE — CLOCK LOCK

==================================================

Create a dedicated puzzle interface.

Header:

LEVEL 01 / 05

THE TIME LOCK

Badge:

MODULO 12

Main layout:

LEFT:

Large interactive-looking analog clock.

The clock should show:

12 numbers

hour hand

minute hand

subtle glow

Also show a small digital display.

RIGHT:

Challenge card:

"THE SYSTEM CLOCK HAS SHIFTED"

Problem:

"The security system currently shows 9.

It will advance by 17 hours.

What number will appear?"

Show:

CURRENT

09

SHIFT

+17 HOURS

Answer input:

"ENTER CODE"

Button:

SUBMIT ANSWER

Secondary:

SHOW HINT

Below answer area:

"REMAINDER LOG"

Initially collapsed.

When opened, display mock reasoning:

17 mod 12 = 5

9 + 5 = 14

14 mod 12 = 2

Use a beautiful mathematical visualization.

At bottom:

BACK

SUBMIT

Use mock success/error states.

SUCCESS:

"TIME LOCK DISABLED"

ERROR:

"INCORRECT CODE"

==================================================

8. LEVEL 2 PAGE — CALENDAR LOCK

==================================================

Same overall puzzle structure but visually adapted to calendar.

Header:

LEVEL 02 / 05

THE CALENDAR LOCK

Badge:

MODULO 7

Left:

Interactive circular weekday wheel.

Days:

MON

TUE

WED

THU

FRI

SAT

SUN

Show a highlighted current day.

Right:

Challenge:

"The system was activated on Monday.

It will trigger again after 45 days.

Which weekday will it activate?"

Answer options:

MONDAY

TUESDAY

WEDNESDAY

THURSDAY

FRIDAY

SATURDAY

SUNDAY

Use selectable cards.

Below:

REMAINDER LOG

45 mod 7 = 3

Monday + 3 = Thursday

Make this look like a digital calculation terminal.

==================================================

9. LEVEL 3 PAGE — RECURRING EVENT

==================================================

Title:

LEVEL 03 / 05

THE RECURRING SIGNAL

Badge:

CYCLIC SCHEDULING

Visual:

A horizontal timeline.

FRIDAY

↓

10 DAYS

↓

MONDAY

↓

10 DAYS

↓

THURSDAY

↓

10 DAYS

↓

SUNDAY

Make the timeline animated.

Challenge:

"A security scan runs every 10 days.

Today is Friday.

Determine the weekday of the 4th scan."

Include:

EVENT INTERVAL

10 DAYS

START DAY

FRIDAY

NUMBER OF OCCURRENCES

4

Answer area.

Also include an educational side panel:

"WHY IT WORKS"

10 mod 7 = 3

Every event shifts by 3 weekdays.

This section should clearly connect modular arithmetic to real-world scheduling.

==================================================

10. LEVEL 4 PAGE — ENCRYPTION CHAMBER

==================================================

Make this page feel substantially more cyber-security focused.

Header:

LEVEL 04 / 05

THE ENCRYPTION CHAMBER

Badge:

MODULO 26

Main visual:

Create a large circular alphabet cipher wheel.

Outer ring:

A B C D E ... Z

Inner ring:

A B C D E ... Z

Show a rotation offset.

Add subtle rotation animation.

Center:

LOCK ICON

Right panel:

ENCRYPTION TERMINAL

Plaintext:

HELLO

KEY:

3

Output:

KHOOR

Display the transformation:

H → K

E → H

L → O

L → O

O → R

Formula panel:

C = (P + K) mod 26

Use a clean mathematical card.

Buttons:

ENCRYPT

RESET

Also include:

"TRY YOUR OWN MESSAGE"

Input:

TYPE MESSAGE

KEY:

[3]

Button:

ENCRYPT MESSAGE

Use mock output.

==================================================

11. LEVEL 5 PAGE — DECRYPTION CORE

==================================================

Make this the most intense puzzle screen.

Header:

LEVEL 05 / 05

THE DECRYPTION CORE

Badge:

FINAL SECURITY LAYER

Main screen:

Large encrypted message:

FRPSXWHU

Below:

KEY

3

Challenge:

"Decrypt the intercepted transmission."

Input:

YOUR ANSWER

Button:

DECRYPT

Hint button.

Show formula:

P = (C - K + 26) mod 26

Below:

CHARACTER ANALYSIS

F → C

R → O

P → M

S → P

X → U

W → T

H → E

U → R

Result:

COMPUTER

Use animated character transitions.

When solved:

"DECRYPTION COMPLETE"

Then show:

FINAL VAULT ACCESS GRANTED

Button:

ENTER FINAL VAULT

==================================================

12. FINAL VAULT PAGE

==================================================

This should be the most cinematic page.

Full-screen dark environment.

Central futuristic vault door.

Large circular lock.

Text:

FINAL SECURITY PROTOCOL

"All five layers have been breached."

Show:

CLOCK ✓

CALENDAR ✓

EVENT ✓

ENCRYPTION ✓

DECRYPTION ✓

Then:

FINAL ACCESS CODE

Create four large digit slots:

_ _ _ _

Input keypad below.

Buttons:

0-9

CLEAR

UNLOCK

Add subtle mechanical animation.

When the correct mock code is entered:

Vault door animation.

Show:

ACCESS GRANTED

VAULT UNLOCKED

MISSION COMPLETE

==================================================

13. SUCCESS PAGE

==================================================

Create a celebratory but elegant success screen.

Large:

🔓

VAULT UNLOCKED

"YOU ESCAPED THE CIPHER VAULT"

Stats:

TIME

04:37

SCORE

920

HINTS

1

LEVELS

5 / 5

Buttons:

VIEW SOLUTION LOG

PLAY AGAIN

RETURN TO DASHBOARD

Use subtle particles/confetti, not excessive effects.

==================================================

14. SOLUTION LOG PAGE

==================================================

This page is very important academically.

Title:

SOLUTION LOG

Subtitle:

"Your remainder-based reasoning."

Create a vertical timeline.

LEVEL 01

CLOCK

Problem:

9 + 17 hours

Reasoning:

17 mod 12 = 5

9 + 5 = 14

14 mod 12 = 2

Answer:

2

LEVEL 02

CALENDAR

45 mod 7 = 3

Monday + 3 = Thursday

LEVEL 03

RECURRING EVENT

10 mod 7 = 3

Each event shifts by 3 weekdays.

LEVEL 04

ENCRYPTION

H = 7

(7 + 3) mod 26 = 10

10 = K

Continue for the remaining letters.

LEVEL 05

DECRYPTION

Show character-by-character transformation.

Make each calculation visually clear.

==================================================

15. CIPHER LAB PAGE

==================================================

Create an experimental sandbox.

Header:

CIPHER LAB

Subtitle:

"Experiment with cyclic encryption."

Two-column layout.

LEFT:

Plaintext input.

Key slider:

0 — 25

Interactive alphabet wheel.

RIGHT:

Encrypted output.

Show character mappings.

Example:

A → D

B → E

C → F

Include:

ENCRYPT

DECRYPT

RESET

Also show the formula:

C = (P + K) mod 26

This page should feel like a cybersecurity laboratory.

==================================================

16. LEADERBOARD PAGE

==================================================

Create a competitive leaderboard.

Title:

VAULT RUNNERS

Columns:

RANK

PLAYER

TIME

SCORE

HINTS

Mock entries:

01

CipherFox

03:42

980

0

02

Nova

04:17

945

1

03

ByteGhost

04:37

920

1

Highlight current player.

Add tabs:

TODAY

THIS WEEK

ALL TIME

==================================================

17. ABOUT / LEARN PAGE

==================================================

Title:

THE MATHEMATICS BEHIND THE VAULT

Explain visually:

WHAT IS MODULAR ARITHMETIC?

"When numbers exceed a cycle, they wrap around."

Create three visual cards:

MOD 12

CLOCKS

MOD 7

WEEKDAYS

MOD 26

ALPHABET / CIPHER

Then:

REAL-WORLD APPLICATIONS

Time Management

Scheduling

Cryptography

Computer Science

Add a simple visual showing:

NUMBER

↓

REMAINDER

↓

CYCLIC PATTERN

↓

APPLICATION

==================================================

18. GAME UI STATES

==================================================

Create reusable UI states for:

Normal

Hover

Focused

Correct

Incorrect

Locked

Completed

Loading

Success modal:

✓ CORRECT

"Security layer disabled."

Error modal:

✕ ACCESS DENIED

"Incorrect code. Try again."

Hint modal:

💡 HINT

Show hint content.

==================================================

19. ANIMATIONS

==================================================

Use Framer Motion.

Animations should be subtle and premium.

Include:

- page transitions

- card hover

- glowing active states

- progress animation

- cipher wheel rotation

- clock hand movement

- number transitions

- lock opening

- vault unlocking

- success particles

Do NOT over-animate the interface.

==================================================

20. RESPONSIVENESS

==================================================

Desktop:

optimized for 1440px and 1920px.

Tablet:

adapt layouts.

Mobile:

stack puzzle panels vertically.

The game must remain usable on mobile.

==================================================

21. COMPONENT ARCHITECTURE

==================================================

Create reusable components:

AppLayout

Sidebar

TopBar

Timer

ScoreDisplay

LivesDisplay

ProgressBar

LevelCard

PuzzleCard

AnswerInput

HintButton

ReasoningPanel

MathDisplay

ClockVisualization

CalendarWheel

EventTimeline

CipherWheel

EncryptionTerminal

DecryptionTerminal

VaultLock

SuccessModal

ErrorModal

SolutionTimeline

Keep components modular.

==================================================

22. ROUTES

==================================================

Create these routes:

/

 /briefing

 /dashboard

 /levels

 /level/1

 /level/2

 /level/3

 /level/4

 /level/5

 /vault

 /success

 /solution-log

 /cipher-lab

 /leaderboard

 /about

==================================================

23. IMPORTANT DEVELOPMENT RULE

==================================================

Use MOCK GAME DATA.

The UI should be fully navigable, but actual modular arithmetic validation, encryption/decryption, scoring and level unlocking should be left as clean placeholders.

For example:

handleSubmit()

handleHint()

handleUnlock()

These functions can contain temporary mock behavior.

Do NOT build a backend.

Do NOT add authentication.

Do NOT introduce unnecessary dependencies.

The final result should feel like a polished, production-quality cyber escape-room interface ready for a developer to connect the actual game engine later.

Prioritize visual quality, consistency, responsiveness, accessibility and clean component structure.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7d7b68c3-a81c-4e39-ba2a-f38d007d33ea).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
