import React from 'react';
import path from 'path';
import fs from 'fs';
import App, { AppInitialProps, AppContext } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import { END } from 'redux-saga';
import { makeStore as SagaStore, wrapper } from '../store/store';
import AudioPlayerContainer from '../components/audioPlayer/audioPlayerCont';
import '../styles/globals.css';
import 'nprogress/nprogress.css';
import NavBar from '../components/Navbar';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx, router }: any) => {
    // 1. Wait for all page actions to dispatch
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };

    // 2. Stop the saga if on server
    if (ctx.req) {
      ctx.store.dispatch(END);
      await ctx.store.sagaTask.toPromise();
    }

    const dir = path.join(process.cwd(), 'public', 'static');
    const filePath = `${dir}/${router?.locale || 'en'}.json`;
    const buffer = fs.readFileSync(filePath);
    const content = JSON.parse(buffer.toString());

    pageProps.content = content;
    pageProps.locale = router?.locale || 'en';

    // 3. Return props
    return {
      pageProps,
    };
  };

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <div className="bg-gray-100 dark:bg-black flex flex-col absolute h-full w-full ">
        <NavBar
          appName={pageProps?.content?.appName}
          locale={pageProps?.locale}
          toogleMobileMenu={() => {
            const m = 1;
          }}
        />
        <Component {...pageProps} />
        <AudioPlayerContainer />
      </div>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
