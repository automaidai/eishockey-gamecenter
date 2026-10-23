'use client';

import { useState } from 'react';
import { ArrowRight, ChevronRight, Menu, Search, Trophy, X } from 'lucide-react';

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

const topLeagueHubs = [
  {
    name: 'Oberliga Nord',
    label: 'NORD',
    code: 'OLN',
    round: '19. SPIELTAG · FR, 30.10.',
    fixtures: [
      ['19:30', 'Hannover Scorpions', 'Saale Bulls Halle'],
      ['19:30', 'Herner EV', 'Tilburg Trappers'],
      ['19:30', 'Hannover Indians', 'IceFighters Leipzig'],
      ['20:00', 'Füchse Duisburg', 'Hammer Eisbären'],
      ['20:00', 'Rostock Piranhas', 'Herford Ice Dragons'],
      ['20:00', 'TecArt Black Dragons', 'Moskitos Essen'],
    ],
    table: [
      ['Hannover Scorpions', 43],
      ['Saale Bulls Halle', 39],
      ['Tilburg Trappers', 35],
      ['Hannover Indians', 33],
      ['IceFighters Leipzig', 30],
      ['Herner EV', 27],
      ['Moskitos Essen', 25],
      ['Füchse Duisburg', 22],
      ['Rostock Piranhas', 20],
      ['Herford Ice Dragons', 17],
      ['Hammer Eisbären', 14],
      ['TecArt Black Dragons', 11],
    ],
    news: [
      ['Herner EV', 'Indians erwarten intensives Duell', 'VOR 2 STD.'],
      ['Scorpions', 'Vorverkauf für das Spitzenspiel läuft', 'VOR 4 STD.'],
      ['Saale Bulls', 'Neuzugang steht vor seinem Debüt', 'VOR 6 STD.'],
      ['Tilburg', 'Trappers melden kompletten Kader', 'GESTERN'],
    ],
  },
  {
    name: 'Oberliga Süd',
    label: 'SÜD',
    code: 'OLS',
    round: '20. SPIELTAG · FR, 30.10.',
    fixtures: [
      ['19:30', 'Heilbronner Falken', 'EV Füssen'],
      ['19:30', 'Deggendorfer SC', 'Tölzer Löwen'],
      ['19:30', 'Bietigheim Steelers', 'Memmingen Indians'],
      ['20:00', 'Erding Gladiators', 'Passau Black Hawks'],
      ['20:00', 'Stuttgart Rebels', 'Höchstadt Alligators'],
      ['20:00', 'Lindau Islanders', 'Peiting'],
    ],
    table: [
      ['Deggendorfer SC', 41],
      ['Heilbronner Falken', 38],
      ['Bietigheim Steelers', 34],
      ['Memmingen Indians', 32],
      ['Tölzer Löwen', 29],
      ['Erding Gladiators', 27],
      ['Höchstadt Alligators', 25],
      ['EV Füssen', 23],
      ['Passau Black Hawks', 21],
      ['Lindau Islanders', 19],
      ['Peiting', 17],
      ['Stuttgart Rebels', 13],
      ['Bayreuth Tigers', 10],
    ],
    news: [
      ['EV Füssen', 'Füssen reist mit voller Stärke an', 'VOR 3 STD.'],
      ['Deggendorf', 'DSC fokussiert sich aufs Heimspiel', 'VOR 5 STD.'],
      ['Heilbronn', 'Falken verlängern mit Verteidiger', 'VOR 7 STD.'],
      ['Bietigheim', 'Steelers laden zum Familientag', 'GESTERN'],
    ],
  },
  {
    name: 'Bayernliga',
    label: 'BEV',
    code: 'BYL',
    round: '12. SPIELTAG · SO, 01.11.',
    fixtures: [
      ['17:30', 'EHC Königsbrunn', 'EHC Klostersee'],
      ['18:00', 'TEV Miesbach', 'ESC Geretsried'],
      ['18:00', 'Erding Gladiators', 'HC Landsberg'],
      ['18:00', 'EA Schongau', 'EHC Waldkraiburg'],
      ['18:00', 'EC Pfaffenhofen', 'EHC Bayreuth'],
      ['18:30', 'EV Dingolfing', 'ERSC Amberg'],
      ['18:30', 'Kempten Sharks', 'Buchloe Pirates'],
      ['19:00', 'Eispiraten Dorfen', 'Pegnitz Ice Dogs'],
    ],
    table: [
      ['Erding Gladiators', 40],
      ['EHC Königsbrunn', 36],
      ['TEV Miesbach', 33],
      ['EHC Klostersee', 31],
      ['Kempten Sharks', 28],
      ['HC Landsberg', 26],
      ['ESC Geretsried', 24],
      ['EHC Waldkraiburg', 22],
      ['EV Dingolfing', 20],
      ['EA Schongau', 18],
      ['Buchloe Pirates', 16],
      ['ERSC Amberg', 15],
      ['EC Pfaffenhofen', 13],
      ['Eispiraten Dorfen', 11],
      ['Pegnitz Ice Dogs', 9],
      ['EHC Bayreuth', 7],
    ],
    news: [
      ['Klostersee', 'Derby-Woche startet mit offenem Training', 'VOR 5 STD.'],
      ['Königsbrunn', 'Pinguine setzen auf starke Defensive', 'VOR 7 STD.'],
      ['Miesbach', 'TEV gibt Kader-Update bekannt', 'GESTERN'],
      ['Landsberg', 'Riverkings erwarten volle Halle', 'GESTERN'],
    ],
  },
  {
    name: 'DFEL Frauen',
    label: 'FRAUEN',
    code: 'DFEL',
    round: '9. SPIELTAG · SA, 31.10.',
    fixtures: [
      ['17:15', 'Mad Dogs Mannheim', 'ESC Planegg'],
      ['17:30', 'ECDC Memmingen', 'ERC Ingolstadt'],
      ['18:00', 'Eisbären Berlin', 'EC Bergkamen'],
      ['19:00', 'Kölner Haie', 'Düsseldorfer EG'],
    ],
    table: [
      ['ECDC Memmingen', 37],
      ['ERC Ingolstadt', 34],
      ['ESC Planegg', 29],
      ['Mad Dogs Mannheim', 25],
      ['Eisbären Berlin', 21],
      ['EC Bergkamen', 17],
      ['Kölner Haie', 12],
      ['Düsseldorfer EG', 8],
    ],
    news: [
      ['Mannheim', 'Junges Team nimmt wichtige Punkte ins Visier', 'VOR 6 STD.'],
      ['Memmingen', 'Indians bestätigen starke Form', 'VOR 8 STD.'],
      ['Ingolstadt', 'Pantherinnen vor schwerem Wochenende', 'GESTERN'],
      ['Planegg', 'ESC setzt weiter auf den Nachwuchs', 'GESTERN'],
    ],
  },
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

  const openLeagueStats = (name: string) => {
    setLeague(name);
    nav('statistik');
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

      {page !== 'start' && (
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
      )}

      <main className={page === 'start' ? 'home-main' : ''}>
        {page !== 'start' && <div className="section-bar"><span>DEUTSCHES EISHOCKEY</span><span>SAISON 2026/27 · KONZEPT</span></div>}

        {page === 'start' && (
          <section className="league-hubs" aria-label="Top-Ligen">
            <div className="league-master-grid">
              {topLeagueHubs.map((item) => (
                <div className="league-hub" key={item.name}>
                    <button className="league-module logo-module" onClick={() => selectLeague(item.name)}>
                      <span className="module-kicker">LIGA · DEMO</span>
                      <div className="league-mark"><span>{item.label}</span><strong>{item.code}</strong></div>
                      <h3>{item.name}</h3>
                      <span className="module-link">ZUR LIGA <ChevronRight size={15} /></span>
                    </button>

                    <button className="league-module fixtures-module" onClick={() => nav('spiel')}>
                      <span className="module-kicker">KOMMENDER SPIELTAG · DEMO</span>
                      <h3>{item.round}</h3>
                      <div className="compact-fixtures">
                        {item.fixtures.map((fixture) => (
                          <div key={`${fixture[1]}-${fixture[2]}`}><b>{fixture[0]}</b><span>{fixture[1]}</span><i>–</i><span>{fixture[2]}</span></div>
                        ))}
                      </div>
                      <span className="module-link">SPIELTAG ÖFFNEN <ChevronRight size={15} /></span>
                    </button>

                    <button className="league-module standings-module" onClick={() => openLeagueStats(item.name)}>
                      <span className="module-kicker">GESAMTE TABELLE · DEMO</span>
                      <div className="mini-table">
                        {item.table.map((team, index) => (
                          <div key={team[0]}><b>{index + 1}</b><span>{team[0]}</span><strong>{team[1]}</strong></div>
                        ))}
                      </div>
                      <span className="module-link">TABELLE ÖFFNEN <ChevronRight size={15} /></span>
                    </button>

                    <button className="league-module news-module" onClick={() => selectLeague(item.name)}>
                      <span className="module-kicker">4 NEUESTE NEWS · DEMO</span>
                      <div className="compact-news">
                        {item.news.map((newsItem) => (
                          <div key={newsItem[1]}><span>{newsItem[0]}</span><h3>{newsItem[1]}</h3><small>{newsItem[2]}</small></div>
                        ))}
                      </div>
                      <span className="module-link">ALLE NEWS <ChevronRight size={15} /></span>
                    </button>
                </div>
              ))}
            </div>
          </section>
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
