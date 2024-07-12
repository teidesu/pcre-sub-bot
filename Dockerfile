FROM denoland/deno:alpine-1.44.2@sha256:b1e64eaef3d1c19aac240454e1245a15fc827199e2246dfa81f4c6f57dda15ae

WORKDIR /app

RUN apk add pcre2 sqlite-dev

USER deno


COPY ./src /app/src
COPY deno.json deno.lock /app/

RUN deno cache src/main.ts

ENV PCRE2_LIB=/usr/lib/libpcre2-8.so.0
ENV DENO_SQLITE_PATH=/usr/lib/libsqlite3.so

CMD ["run", "--lock=deno.lock", "--cached-only", "-A", "--unstable-ffi", "src/main.ts"]