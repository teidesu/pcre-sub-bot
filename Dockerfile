FROM denoland/deno:alpine-1.45.0@sha256:dd724c13cefa1a6ca84f62391998c44553b1b2d423b1747218696a00a16ab25a

WORKDIR /app

RUN apk add pcre2

USER deno


COPY ./src /app/src
COPY deno.json deno.lock /app/

RUN deno cache src/main.ts

ENV PCRE2_LIB=/usr/lib/libpcre2-8.so.0

CMD ["run", "--lock=deno.lock", "--cached-only", "-A", "--unstable-ffi", "src/main.ts"]