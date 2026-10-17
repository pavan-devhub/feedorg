import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import HomeHero from '../components/HomeHero.jsx'
import PageStyles from '../components/PageStyles.jsx'
import ScreensHero from '../components/ScreensHero.jsx'
import StageJourney from '../components/StageJourney.jsx'
import { screens, stages } from '../data/screens.js'
import css from '../styles/pages/home.css?inline'

const finalStage = stages.at(-1)

// The final stage is a single badge screen, so it's reached through "Badges" (as in the design)
const filters = [
  { value: 'all', label: 'All', className: 'filter--all' },
  ...stages
    .filter((stage) => stage !== finalStage)
    .map((stage) => ({ value: String(stage.id), label: `Stage ${stage.id}` })),
  { value: 'badge', label: 'Badges', className: 'filter--badge', medal: true },
]

// "EPM & Onboarding" → ['epm', 'onboarding'], "KYJ-1" → ['kyj', '1'], "05" → ['5'].
// "and" is dropped so "epm and onboarding" still finds "EPM & Onboarding".
const tokenize = (str) =>
  String(str)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word && word !== 'and')
    .map((word) => word.replace(/^0+(?=\d)/, ''))

// Numbers match a whole word, bar a letter suffix ("8" finds 8 and 8a, not 18);
// words match anywhere in a word ("house" finds Packhouse)
function tokenMatches(token, words) {
  if (/^\d/.test(token)) {
    return words.some((word) => word.startsWith(token) && /^[a-z]*$/.test(word.slice(token.length)))
  }
  return words.some((word) => word.includes(token))
}
const matchesAll = (tokens, words) => tokens.every((token) => tokenMatches(token, words))

const stageWords = new Map(stages.map((stage) => [stage.id, tokenize(stage.name)]))

// A screen is found by its file number, its title, its stage ("stage 1" or "farm ready") and "badge"
const screenWords = new Map(
  screens.map((screen) => [
    screen.id,
    [
      ...tokenize(`${screen.id} ${screen.label} ${screen.title} stage ${screen.stage}`),
      ...stageWords.get(screen.stage),
      ...(screen.badge ? ['badge'] : []),
    ],
  ]),
)

// Reads the search box: "stage 1" → that stage; a file number ("8a", "18", "13a.html") → that
// screen; anything else → every screen whose words match ("farm ready", "epm qr landing").
// `stage` is the section Enter scrolls to when the query names a stage; otherwise it's the
// first result.
function parseSearch(query) {
  const tokens = tokenize(query.replace(/\.html?\b/gi, ' '))
  if (tokens.length === 0) return null

  const stageNumber = tokens.join(' ').match(/^stage ?(\d+)$/)
  if (stageNumber) {
    const stage = Number(stageNumber[1])
    return { test: (screen) => screen.stage === stage, stage }
  }

  const file = tokens.length === 1 && screens.find((s) => s.id === tokens[0] || s.label === tokens[0])
  if (file) return { test: (screen) => screen === file }

  return {
    test: (screen) => matchesAll(tokens, screenWords.get(screen.id)),
    stage: stages.find((stage) => matchesAll(tokens, stageWords.get(stage.id)))?.id,
  }
}

function matches(screen, filter, search) {
  if (filter === 'badge' && !screen.badge) return false
  if (filter !== 'all' && filter !== 'badge' && filter !== String(screen.stage)) return false
  return !search || search.test(screen)
}

// Scrolls down to the #stage-<stage> section if it's showing, else to the first result
// (or the "no match" note)
function showResults(stage) {
  const target = document.getElementById(`stage-${stage}`) ?? document.querySelector('#screens .journey-stage, #screens .empty')
  target?.scrollIntoView({ block: 'start' })
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const searchRef = useRef(null)

  // "/" focuses the search box from anywhere on the page
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === '/' && document.activeElement !== searchRef.current) {
        e.preventDefault()
        searchRef.current.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const search = parseSearch(query)
  const groups = stages
    .map((stage) => ({
      stage,
      items: screens.filter((screen) => screen.stage === stage.id && matches(screen, filter, search)),
    }))
    .filter((group) => group.items.length > 0)

  // The search and the stage buttons each pick what's listed, so using one resets the other:
  // a search looks through every stage, and a stage button shows that whole stage
  function changeQuery(value) {
    setQuery(value)
    if (value.trim()) setFilter('all')
  }

  function changeFilter(value) {
    // render the new list now so its section is there to scroll to
    flushSync(() => {
      setFilter(value)
      setQuery('')
    })
    showResults(value)
  }

  return (
    <div className="home">
      <title>KYJ Screens · Krushi Yeva Jayate</title>
      <PageStyles css={css} />

      <a className="skip-link" href="#screens">Skip to screens</a>

      <HomeHero />

      <main>
        {/* Screens */}
        <section className="home-screens" id="screens">
          <ScreensHero
            query={query}
            onQueryChange={changeQuery}
            onSearch={() => showResults(search?.stage)}
            filters={filters}
            filter={filter}
            onFilterChange={changeFilter}
            searchRef={searchRef}
          />

          {/* full width: the stages' pale blue band runs edge to edge */}
          {groups.length > 0 && <StageJourney groups={groups} />}

          {groups.length === 0 && (
            <div className="home-container">
              <div className="empty">
                <span className="empty__icon">🔍</span>
                <p><strong>No screens match your search.</strong></p>
                <p>
                  Try a stage like <em>Stage 1</em> or <em>Farm Ready</em>, a step like <em>EPM QR Landing</em>,
                  or a file number like <span className="mono">13a</span>.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
