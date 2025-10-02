create table public.orders
(
    id    uuid default uuid_generate_v4() not null
        constraint "PK_710e2d4957aa5878dfe94e4ac2f"
            primary key,
    email varchar                         not null,
    phone varchar                         not null
);

alter table public.orders
    owner to root;

create table public.films
(
    id          uuid default uuid_generate_v4() not null
        constraint "PK_697487ada088902377482c970d1"
            primary key,
    rating      double precision                not null,
    director    varchar                         not null,
    tags        text[]                          not null,
    image       varchar                         not null,
    cover       varchar                         not null,
    title       varchar                         not null,
    about       varchar                         not null,
    description varchar                         not null
);

alter table public.films
    owner to root;

create table public.schedules
(
    id       uuid default uuid_generate_v4() not null
        constraint "PK_7e33fc2ea755a5765e3564e66dd"
            primary key,
    daytime  varchar                         not null,
    hall     integer                         not null,
    rows     integer                         not null,
    seats    integer                         not null,
    price    double precision                not null,
    taken    text[]                          not null,
    "filmId" uuid
        constraint "FK_1c2f5e637713a429f4854024a76"
            references public.films
);

alter table public.schedules
    owner to root;

create table public.tickets
(
    id          uuid default uuid_generate_v4() not null
        constraint "PK_343bc942ae261cf7a1377f48fd0"
            primary key,
    daytime     varchar                         not null,
    row         integer                         not null,
    seat        integer                         not null,
    price       double precision                not null,
    "sessionId" uuid
        constraint "FK_d175b024857bfa9676f6a06368f"
            references public.schedules,
    "filmId"    uuid
        constraint "FK_0342bf4692dbbef0166d8fb5ee8"
            references public.films,
    "orderId"   uuid
        constraint "FK_e3e1e1e9d4ee34649da54a016e4"
            references public.orders
);

alter table public.tickets
    owner to root;

