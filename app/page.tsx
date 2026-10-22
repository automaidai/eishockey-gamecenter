'use client';

import { useState } from 'react';
import { ArrowRight, BarChart3, ChevronRight, Menu, Search, Trophy, X } from 'lucide-react';

type Page = 'start' | 'liga' | 'spiel' | 'spieler' | 'statistik';

const games = [
  { league: 'OL NORD', a: 'Hannover Scorpions', b: 'Saale Bulls Halle', sa: 4, sb: 1, status: 'BEENDET' },
  { league: 'OL SÜD', a: 'Eisbären Regensburg', b: 'Starbulls Rosenheim', sa: 3, sb: 2, status: 'LIVE · 3. DRITTEL', live: true },
  { league: 'BAYERNLIGA', a: 'Erding Gladiators', b: 'TEV Miesbach', sa: 2, sb: 2, status: 'LIVE · 2. DRITTEL', live: true },
  { league: 'DFEL', a: 'ECDC Memmingen', b: 'ERC Ingolstadt', sa: 4, sb: 3, status: 'BEENDET' },
  { league: 'OL NORD', a: 'Herner EV', b: 'Tilburg Trappers', sa: null, sb: null, status: 'FR · 19:30' },
  { league: 'OL SÜD', a: 'Heilbronner Falken', b: 'EV Füssen', sa: null, sb: null, status: 'FR · 19:30' },
  { league: 'BAYERNLIGA', a: 'EHC Königsbrunn', b: 'EHC Klostersee', sa: null, sb: null, status: 'FR · 20:00' },
  { league: 'DFEL', a: 'Mad Dogs Mannheim', b: 'ESC Planegg', sa: null, sb: null, status: 'SA · 17:15' },
  { league: 'DNL U20', a: 'Kölner Junghaie', b: 'Jungadler Mannheim', sa: null, sb: null, status: 'SA · 18:00' },
  { league: 'U17', a: 'Eisbären Juniors', b: 'Düsseldorfer EG', sa: null, sb: null, status: 'SO · 11:00' },
];

const focusLeagues = [
  { name: 'Oberliga Nord', short: 'OLN', teams: 12, games: 96, accent: 'NORD' },
  { name: 'Oberliga Süd', short: 'OLS', teams: 13, games: 104, accent: 'SÜD' },
  { name: 'Bayernliga', short: 'BYL', teams: 16, games: 120, accent: 'BEV' },
  { name: 'Frauen-Bundesliga', short: 'DFEL', teams: 8, games: 56, accent: 'FRAUEN' },
];

const leagueGroups = [
  {
    title: 'DEB-Ligen',
    items: [
      'Oberliga Nord', 'Oberliga Süd', 'Oberliga Testspiele', 'DFEL Frauen-Bundesliga',
      'DEB-Pokal der Frauen', 'DNL Division I', 'DNL Findung A · Gruppe 1',
      'DNL Findung A · Gruppe 2', 'DNL Division II', 'DNL Division III Nord',
      'DNL Division III Süd', 'DNL Testspiele', 'U17 Division I Nord',
      'U17 Division I Süd · Gruppe A', 'U17 Division I Süd · Gruppe B',
      'U17 Division II Nord', 'U17 Division II Süd', 'U17 Testspiele', 'U15 Endturnier',
    ],
  },
  {
    title: 'Bayerischer Eissport-Verband',
    items: ['Bayernliga / Senioren', 'BEV Frauen', 'BEV U20', 'BEV U17', 'BEV U15', 'BEV U13', 'BEV Löwen'],
  },
  {
    title: 'Weitere Landesverbände',
    items: [
      'EBW Senioren', 'EBW U20', 'EBW U17', 'EBW U15', 'EBW U13', 'EBW Testspiele',
      'NRW Senioren', 'NRW Frauen', 'NRW U20', 'NRW U17', 'NRW U15', 'NRW U13', 'NRW Testspiele',
      'Hessen Senioren', 'Hessen U15', 'Hessen U13', 'Hessen Testspiele',
      'Nordverbund Senioren', 'Nordverbund Frauen', 'Nordverbund U17', 'Nordverbund U15',
      'Nordverbund U13', 'Nordverbund Testspiele', 'RPERV Ligen', 'SEV Senioren',
      'SEV U17', 'SEV U15', 'SEV U13', 'SEV Testspiele', 'DEB/LEV U15 Sichtung',
    ],
  },
  {
    title: 'Nationalteams & Turniere',
    items: [
      'Deutschland Cup', 'Nationalteam Männer', 'Nationalteam Frauen', 'U20 Nationalteam',
      'U19 Nationalteam', 'U18 Nationalteam', 'U17 Nationalteam', 'U16 Nationalteam',
      'Frauen U18', 'Frauen U16', 'U18 Frauen · 4 Nations', 'Erwin Müller Cup',
      'Robert Müller Turnier', '3 Nations Tournament', 'U18 Tournament Sweden', 'Vereinsturniere',
    ],
  },
];

const ranking = [
  ['Hannover Scorpions', 18, 43],
  ['Deggendorfer SC', 18, 39],
  ['Heilbronner Falken', 18, 36],
  ['Starbulls Rosenheim', 18, 32],
  ['Saale Bulls Halle', 18, 28],
];

const scorers = [
  ['Max Mustermann', 'Hannover Scorpions', 14, 22, 36],
  ['Jonas Beispiel', 'Deggendorfer SC', 12, 21, 33],
  ['Leon Weber', 'Heilbronner Falken', 13, 18, 31],
  ['Tim Schneider', 'Saale Bulls Halle', 10, 19, 29],
];

export default function Home() {
  const [page, setPage] = useState<Page>('start');
  const [league, setLeague] = useState('Oberliga Nord');
  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState('Übersicht');
  const [search, setSearch] = useState(false);

  const nav = (next: Page) => {
    setPage(next);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectLeague = (name: string) => {
    setLeague(name);
    nav('liga');
  };

  return (
    <>
      <div className="demo">DESIGN-PROTOTYP · ALLE SPIELSTÄNDE UND STATISTIKEN SIND FIKTIVE DEMODATEN</div>
      <header>
        <div className="top">
          <button className="brand" aria-label="Zur Startseite" onClick={() => nav('start')}>
            <img className="deb-logo" src="/deb-logo.webp" alt="Deutscher Eishockey-Bund" />
          </button>
          <nav className={menu ? 'open' : ''}>
            <button onClick={() => nav('start')}>Startseite</button>
            <button onClick={() => nav('liga')}>Ligen</button>
            <button onClick={() => nav('spiel')}>Game Day</button>
            <button onClick={() => nav('statistik')}>Statistiken</button>
            <button onClick={() => nav('spieler')}>Spieler</button>
          </nav>
          <div className="tools">
            <button aria-label="Suche" onClick={() => setSearch(!search)}><Search size={19} /></button>
            <div className="powered"><span>powered by</span><img src="/partner-sprade.svg" alt="SpradeTV" /></div>
            <button className="hamb" aria-label="Menü" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
          </div>
        </div>
        {search && (
          <div className="search">
            <input autoFocus placeholder="Verein, Spieler oder Liga suchen …" onKeyDown={(event) => {
              if (event.key === 'Enter') { nav('statistik'); setSearch(false); }
            }} />
            <button onClick={() => { nav('statistik'); setSearch(false); }}>Suchen</button>
          </div>
        )}
      </header>

      <section className="ticker">
        <div className="ticker-title"><span className="live-dot" /> GAME DAY <small>10 SPIELE · DEMO</small></div>
        <div className="scores">
          {games.map((game, index) => (
            <button key={index} className="score" onClick={() => nav('spiel')}>
              <span className="score-league">{game.league}</span>
              <span className={game.live ? 'red' : ''}>{game.status}</span>
              <div><b>{game.a}</b><strong>{game.sa ?? '–'}</strong></div>
              <div><b>{game.b}</b><strong>{game.sb ?? '–'}</strong></div>
            </button>
          ))}
        </div>
      </section>

      <main>
        <div className="section-bar"><span>DEUTSCHES EISHOCKEY</span><span>SAISON 2026/27 · KONZEPT</span></div>

        {page === 'start' && (
          <>
            <section className="stats-hero">
              <div className="stats-intro">
                <div className="eyebrow"><span className="line" /> DAS GAMECENTER FÜR ALLE DEB-LIGEN</div>
                <h1>ALLE LIGEN.<br />ALLE SPIELE.<br /><em>ALLE ZAHLEN.</em></h1>
                <p>Ergebnisse, Tabellen, Spielerwerte und Live-Statistiken des deutschen Eishockeys – von der Oberliga bis zum Nachwuchs.</p>
                <div className="actions">
                  <button className="primary" onClick={() => nav('statistik')}>STATISTIKEN ÖFFNEN <ArrowRight size={17} /></button>
                  <button className="outline" onClick={() => nav('liga')}>ALLE LIGEN <ChevronRight size={17} /></button>
                </div>
              </div>
              <div className="stat-board">
                <div><span>WETTBEWERBE</span><strong>70+</strong><small>DEB & Landesverbände</small></div>
                <div><span>HEUTE</span><strong>10</strong><small>Spiele im Game Day</small></div>
                <div><span>LIVE</span><strong>02</strong><small>Partien im Ticker</small></div>
                <div><span>DATEN</span><strong>24/7</strong><small>Tabellen & Scorer</small></div>
              </div>
            </section>

            <section className="focus-section">
              <div className="heading">
                <div><small>LIGEN IM FOKUS</small><h2>DIE WICHTIGSTEN <em>WETTBEWERBE.</em></h2></div>
                <button className="textlink" onClick={() => nav('liga')}>ALLE LIGEN <ArrowRight size={16} /></button>
              </div>
              <div className="focus-grid">
                {focusLeagues.map((item) => (
                  <button className="focus-card" key={item.name} onClick={() => selectLeague(item.name)}>
                    <span>{item.accent}</span><b>{item.short}</b><h3>{item.name}</h3>
                    <div><span><strong>{item.teams}</strong> TEAMS</span><span><strong>{item.games}</strong> SPIELE</span></div>
                    <ChevronRight size={20} />
                  </button>
                ))}
              </div>
            </section>

            <section className="data-dashboard">
              <div className="heading">
                <div><small>DATENZENTRALE · DEMO</small><h2>STATISTIKEN <em>IM BLICK.</em></h2></div>
                <button className="textlink" onClick={() => nav('statistik')}>STATISTIKCENTER <ArrowRight size={16} /></button>
              </div>
              <div className="dashboard-grid">
                <div className="feature-game">
                  <div className="match-meta"><span><span className="live-dot" /> LIVE · OBERLIGA SÜD</span><span>3. DRITTEL</span></div>
                  <div className="match-teams">
                    <div><div className="crest">ER</div><strong>Eisbären<br />Regensburg</strong></div>
                    <div className="bigscore">3 <span>:</span> 2<small>12:46 · 3. DRITTEL</small></div>
                    <div><div className="crest gold">SR</div><strong>Starbulls<br />Rosenheim</strong></div>
                  </div>
                  <button className="fullbtn" onClick={() => nav('spiel')}>MATCHCENTER ÖFFNEN <ArrowRight size={17} /></button>
                </div>
                <div className="table-card">
                  <div className="table-title"><span>OBERLIGA · FORM</span><BarChart3 size={18} /></div>
                  <table><thead><tr><th>PL.</th><th>TEAM</th><th>SP.</th><th>PKT.</th></tr></thead><tbody>
                    {ranking.map((row, index) => <tr key={index}><td><span className={'position ' + (index < 3 ? 'toprank' : '')}>{index + 1}</span></td><td>{row[0]}</td><td>{row[1]}</td><td><b>{row[2]}</b></td></tr>)}
                  </tbody></table>
                </div>
                <div className="leaders-card">
                  <div className="table-title"><span>TOPSCORER · PUNKTE</span><Trophy size={18} /></div>
                  {scorers.slice(0, 3).map((row, index) => (
                    <button key={index} onClick={() => nav('spieler')}><b>0{index + 1}</b><span><strong>{row[0]}</strong><small>{row[1]}</small></span><em>{row[4]}</em></button>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {page === 'liga' && (
          <>
            <div className="heading inner"><div><small>DEB-ONLINE LIGAÜBERSICHT</small><h1>ALLE <em>LIGEN.</em></h1><p>Wettbewerbe des DEB, der Landesverbände sowie Nationalteams und Turniere.</p></div></div>
            <div className="league-directory">
              {leagueGroups.map((group) => (
                <section key={group.title}>
                  <div className="directory-head"><Trophy size={20} /><h2>{group.title}</h2><span>{group.items.length}</span></div>
                  <div className="directory-grid">{group.items.map((item) => <button className={league === item ? 'selected' : ''} onClick={() => setLeague(item)} key={item}>{item}<ChevronRight size={15} /></button>)}</div>
                </section>
              ))}
            </div>
          </>
        )}

        {page === 'spiel' && (
          <>
            <div className="heading inner"><div><small>LIVE-MATCHCENTER · DEMO</small><h1>GAME <em>DAY.</em></h1></div></div>
            <div className="matchcenter">
              <div className="match-meta"><span><span className="live-dot" /> LIVE · OBERLIGA SÜD</span><span>3. DRITTEL</span></div>
              <div className="match-teams"><div><div className="crest">ER</div><strong>Eisbären<br />Regensburg</strong></div><div className="bigscore">3 <span>:</span> 2<small>12:46 · 3. DRITTEL</small></div><div><div className="crest gold">SR</div><strong>Starbulls<br />Rosenheim</strong></div></div>
              <div className="periods"><span>1. Drittel <b>1:1</b></span><span>2. Drittel <b>1:0</b></span><span>3. Drittel <b>1:1</b></span></div>
            </div>
            <div className="pills">{['Übersicht', 'Ticker', 'Statistiken', 'Aufstellung'].map((item) => <button key={item} className={tab === item ? 'selected' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>
            <div className="cols">
              <section className="panel"><h3>{tab === 'Ticker' ? 'LIVE-TICKER' : tab === 'Aufstellung' ? 'AUFSTELLUNG' : tab === 'Statistiken' ? 'SPIELSTATISTIKEN' : 'SPIELVERLAUF'}</h3><div className="events"><p><b>47:14</b><span className="goal">TOR</span> Eisbären Regensburg – 3:2</p><p><b>32:08</b><span className="goal">TOR</span> Eisbären Regensburg – 2:1</p><p><b>18:36</b><span className="goal">TOR</span> Starbulls Rosenheim – 1:1</p></div></section>
              <section className="panel"><h3>TEAMVERGLEICH</h3>{[['SCHÜSSE', 31, 25], ['BULLYS', 54, 46], ['POWERPLAY', 20, 15]].map(([title, a, b]) => <div className="statbar" key={title}><div><b>{a}</b><span>{title}</span><b>{b}</b></div><div className="bar"><i style={{ width: `${Number(a) / (Number(a) + Number(b)) * 100}%` }} /></div></div>)}<p className="muted">Simulierte Werte · keine Live-API verbunden</p></section>
            </div>
          </>
        )}

        {page === 'statistik' && (
          <>
            <div className="heading inner"><div><small>ZAHLEN, DIE BEWEGEN</small><h1>STATISTIK <em>CENTER.</em></h1><p>Tabellen, Topscorer und Teamvergleiche auf einen Blick.</p></div></div>
            <div className="pills">{focusLeagues.map((item) => <button className={league === item.name ? 'selected' : ''} onClick={() => setLeague(item.name)} key={item.name}>{item.name}</button>)}</div>
            <div className="cols">
              <section className="panel"><h3>LIGATABELLE · DEMO</h3><table><thead><tr><th>PL.</th><th>VEREIN</th><th>SP.</th><th>PKT.</th></tr></thead><tbody>{ranking.map((row, index) => <tr key={index}><td>{index + 1}</td><td>{row[0]}</td><td>{row[1]}</td><td><b>{row[2]}</b></td></tr>)}</tbody></table></section>
              <section className="panel"><h3>TOPSCORER · DEMO</h3><table><thead><tr><th>SPIELER</th><th>T</th><th>A</th><th>PKT.</th></tr></thead><tbody>{scorers.map((row, index) => <tr key={index} onClick={() => nav('spieler')} className="clickrow"><td>{row[0]}</td><td>{row[2]}</td><td>{row[3]}</td><td><b>{row[4]}</b></td></tr>)}</tbody></table></section>
            </div>
          </>
        )}

        {page === 'spieler' && (
          <>
            <div className="heading inner"><div><small>SPIELERPROFIL · DEMO</small><h1>THE <em>PLAYERS.</em></h1></div></div>
            <div className="playercard"><div className="playeravatar">27</div><div><small>STÜRMER · DEMOPROFIL</small><h2>MAX<br /><em>MUSTERMANN.</em></h2><p>Hannover Scorpions · #27</p><div className="playerstats"><div><strong>18</strong><span>SPIELE</span></div><div><strong>14</strong><span>TORE</span></div><div><strong>22</strong><span>ASSISTS</span></div><div><strong>36</strong><span>PUNKTE</span></div></div></div></div>
          </>
        )}
      </main>

      <footer>
        <div className="footerbrand">EISHOCKEY <b>GAMECENTER<span>.</span></b></div>
        <p>Design-Prototyp · Nicht offizielle DEB-Website · Keine echten Spieldaten</p>
        <div className="footer-made">Lovely made by <strong>SpradeTV</strong></div>
      </footer>
    </>
  );
}
