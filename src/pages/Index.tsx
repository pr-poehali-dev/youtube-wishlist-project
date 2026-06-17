import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const THUMBS = {
  mountain: 'https://cdn.poehali.dev/projects/e9048fef-6ef1-49e2-bc92-d1733f569467/files/3cbb0f4a-8090-45c9-a6ba-94c2df23c3e8.jpg',
  desk: 'https://cdn.poehali.dev/projects/e9048fef-6ef1-49e2-bc92-d1733f569467/files/f244a72c-10c6-4be9-87d7-268ffbbbf0ce.jpg',
  city: 'https://cdn.poehali.dev/projects/e9048fef-6ef1-49e2-bc92-d1733f569467/files/0f33a0db-23d8-4d95-9c3d-104774774a83.jpg',
};

interface Video {
  id: number;
  title: string;
  author: string;
  views: string;
  time: string;
  duration: string;
  thumb: string;
}

const VIDEOS: Video[] = [
  { id: 1, title: 'Рассвет в горах: тайм-лапс на закате солнца', author: 'Nature Lab', views: '1,2 млн', time: '3 дня назад', duration: '12:04', thumb: THUMBS.mountain },
  { id: 2, title: 'Минимализм в рабочем пространстве — как настроить фокус', author: 'Deep Work', views: '340 тыс', time: 'неделю назад', duration: '08:51', thumb: THUMBS.desk },
  { id: 3, title: 'Ночной город: неон и отражения', author: 'Urban Eye', views: '892 тыс', time: '2 недели назад', duration: '15:22', thumb: THUMBS.city },
  { id: 4, title: 'Спокойствие природы — звуки для сна и работы', author: 'Nature Lab', views: '2,5 млн', time: 'месяц назад', duration: '01:02:10', thumb: THUMBS.mountain },
  { id: 5, title: 'Эстетика чистого стола: 5 принципов', author: 'Deep Work', views: '120 тыс', time: '4 дня назад', duration: '06:33', thumb: THUMBS.desk },
  { id: 6, title: 'Киберпанк улицы под дождём', author: 'Urban Eye', views: '610 тыс', time: '5 дней назад', duration: '09:47', thumb: THUMBS.city },
];

const NAV = [
  { id: 'home', label: 'Главная', icon: 'House' },
  { id: 'videos', label: 'Видео', icon: 'Clapperboard' },
  { id: 'history', label: 'История', icon: 'History' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
];

interface Comment {
  id: number;
  author: string;
  initials: string;
  text: string;
  time: string;
  likes: number;
}

const INITIAL_COMMENTS: Comment[] = [
  { id: 1, author: 'Анна К.', initials: 'АК', text: 'Невероятная съёмка! Музыка идеально подобрана под кадры.', time: '2 ч назад', likes: 48 },
  { id: 2, author: 'Дмитрий', initials: 'Д', text: 'Пересматриваю уже третий раз, залипательно 🔥', time: '5 ч назад', likes: 12 },
];

const VideoCard = ({ video, onClick, index }: { video: Video; onClick: () => void; index: number }) => (
  <button
    onClick={onClick}
    className="group text-left animate-fade-up"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <div className="relative overflow-hidden rounded-xl bg-secondary aspect-video">
      <img src={video.thumb} alt={video.title} className="h-full w-full object-cover hover-scale" />
      <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-xs font-medium">
        {video.duration}
      </span>
    </div>
    <div className="mt-3 flex gap-3">
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarFallback className="bg-accent text-accent-foreground text-xs font-semibold">
          {video.author[0]}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{video.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{video.author}</p>
        <p className="text-xs text-muted-foreground">{video.views} просмотров · {video.time}</p>
      </div>
    </div>
  </button>
);

export default function Index() {
  const [section, setSection] = useState('home');
  const [active, setActive] = useState<Video | null>(null);
  const [search, setSearch] = useState('');
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [draft, setDraft] = useState('');

  const filtered = VIDEOS.filter(
    (v) => v.title.toLowerCase().includes(search.toLowerCase()) || v.author.toLowerCase().includes(search.toLowerCase())
  );

  const openVideo = (v: Video) => {
    setActive(v);
    setComments(INITIAL_COMMENTS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addComment = () => {
    if (!draft.trim()) return;
    setComments([{ id: Date.now(), author: 'Вы', initials: 'В', text: draft, time: 'только что', likes: 0 }, ...comments]);
    setDraft('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-8">
        <button onClick={() => { setActive(null); setSection('home'); }} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Icon name="Play" size={18} className="text-accent-foreground" fallback="Play" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">Vimo</span>
        </button>

        <div className="relative ml-auto w-full max-w-md">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActive(null); setSection('videos'); }}
            placeholder="Поиск видео..."
            className="rounded-full border-border bg-secondary pl-9"
          />
        </div>

        <Avatar className="hidden h-9 w-9 sm:flex">
          <AvatarFallback className="bg-secondary text-sm font-semibold">В</AvatarFallback>
        </Avatar>
      </header>

      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 flex-col gap-1 border-r border-border p-3 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => { setSection(item.id); setActive(null); }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                section === item.id && !active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/60'
              }`}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-4 md:p-8">
          {active ? (
            <div className="mx-auto max-w-4xl animate-fade-up">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-secondary">
                <img src={active.thumb} alt={active.title} className="h-full w-full object-cover opacity-60" />
                <button className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-accent/90 transition-transform hover:scale-110">
                  <Icon name="Play" size={32} className="ml-1 text-accent-foreground" />
                </button>
              </div>

              <h1 className="mt-5 text-2xl font-bold leading-tight">{active.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className="bg-accent text-accent-foreground font-semibold">{active.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{active.author}</p>
                    <p className="text-xs text-muted-foreground">128 тыс подписчиков</p>
                  </div>
                  <Button className="ml-2 rounded-full">Подписаться</Button>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="secondary" className="rounded-full">
                    <Icon name="ThumbsUp" size={16} className="mr-1" /> 12 тыс
                  </Button>
                  <Button variant="secondary" className="rounded-full">
                    <Icon name="Share2" size={16} className="mr-1" /> Поделиться
                  </Button>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-secondary p-4 text-sm">
                <p className="font-medium">{active.views} просмотров · {active.time}</p>
                <p className="mt-2 text-muted-foreground">
                  Погрузитесь в атмосферу этого ролика. Качественная съёмка, продуманный монтаж и спокойное настроение.
                </p>
              </div>

              <section className="mt-8">
                <h2 className="mb-4 text-lg font-bold">{comments.length} комментариев</h2>
                <div className="flex gap-3">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="bg-secondary text-sm font-semibold">В</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Оставьте комментарий..."
                      className="resize-none border-border bg-secondary"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => setDraft('')}>Отмена</Button>
                      <Button onClick={addComment} disabled={!draft.trim()} className="rounded-full">
                        Отправить
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-3 animate-fade-up">
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="bg-secondary text-xs font-semibold">{c.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">
                          <span className="font-semibold">{c.author}</span>{' '}
                          <span className="text-xs text-muted-foreground">{c.time}</span>
                        </p>
                        <p className="mt-1 text-sm">{c.text}</p>
                        <div className="mt-2 flex items-center gap-4 text-muted-foreground">
                          <button className="flex items-center gap-1 text-xs hover:text-foreground">
                            <Icon name="ThumbsUp" size={14} /> {c.likes}
                          </button>
                          <button className="text-xs hover:text-foreground">Ответить</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : section === 'profile' ? (
            <div className="mx-auto max-w-3xl animate-fade-up">
              <div className="flex items-center gap-5">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-accent text-2xl font-bold text-accent-foreground">В</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-extrabold">Ваш профиль</h1>
                  <p className="mt-1 text-muted-foreground">@you · 0 подписчиков</p>
                </div>
              </div>
              <h2 className="mb-4 mt-10 text-lg font-bold">Понравившиеся видео</h2>
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {VIDEOS.slice(0, 3).map((v, i) => <VideoCard key={v.id} video={v} onClick={() => openVideo(v)} index={i} />)}
              </div>
            </div>
          ) : section === 'history' ? (
            <div className="mx-auto max-w-3xl animate-fade-up">
              <h1 className="mb-6 text-2xl font-bold">История просмотров</h1>
              <div className="space-y-4">
                {VIDEOS.slice(0, 4).map((v) => (
                  <button key={v.id} onClick={() => openVideo(v)} className="group flex w-full gap-4 text-left">
                    <div className="relative aspect-video w-44 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <img src={v.thumb} alt={v.title} className="h-full w-full object-cover hover-scale" />
                      <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[10px]">{v.duration}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold leading-snug">{v.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{v.author}</p>
                      <p className="text-xs text-muted-foreground">{v.views} просмотров</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {section === 'home' && (
                <div className="mb-8 flex gap-2 overflow-x-auto no-scrollbar">
                  {['Все', 'Природа', 'Минимализм', 'Город', 'Музыка', 'Работа'].map((t, i) => (
                    <button key={t} className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium ${i === 0 ? 'bg-foreground text-background' : 'bg-secondary text-foreground'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              )}
              {search && filtered.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground">
                  <Icon name="SearchX" size={40} className="mx-auto mb-3" />
                  Ничего не найдено по запросу «{search}»
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((v, i) => <VideoCard key={v.id} video={v} onClick={() => openVideo(v)} index={i} />)}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-background/90 backdrop-blur-xl md:hidden">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => { setSection(item.id); setActive(null); }}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] ${
              section === item.id && !active ? 'text-accent' : 'text-muted-foreground'
            }`}
          >
            <Icon name={item.icon} size={20} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="h-14 md:hidden" />
    </div>
  );
}
