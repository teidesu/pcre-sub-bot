FROM denoland/deno:2.6.8

WORKDIR /app

RUN apt update && apt install -y libpcre2-dev && apt clean && rm -rf /var/lib/apt/lists/*
RUN ln -s /usr/lib/$(uname -m)-linux-gnu/libpcre2-8.so.0 /usr/lib/libpcre2-8.so.0
USER deno


COPY ./src /app/src
COPY deno.json deno.lock /app/

RUN deno cache src/main.ts

ENV PCRE2_LIB=/usr/lib/libpcre2-8.so.0
ENV ENV=production

CMD ["run", "--lock=deno.lock", "--cached-only", "-A", "--unstable-ffi", "src/main.ts"]