FROM nginx:alpine

LABEL maintainer="VJ Modular Team"
LABEL description="VJ Modular Strobe Engine - Professional Visual Performance System"

# 移除 Nginx 默认配置
RUN rm -rf /etc/nginx/conf.d/default.conf /usr/share/nginx/html/*

# 复制自定义 Nginx 配置 (监听 20023 端口)
COPY nginx.conf /etc/nginx/conf.d/vj-strobe.conf

# 复制 Web 静态应用文件及插件
COPY index.html /usr/share/nginx/html/
COPY screen.html /usr/share/nginx/html/
COPY icon.svg /usr/share/nginx/html/
COPY plugins /usr/share/nginx/html/plugins

# 暴露 20023 端口
EXPOSE 20023

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:20023/ || exit 1

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
