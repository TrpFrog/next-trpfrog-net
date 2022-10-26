import Script from 'next/script'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

const Analytics = () => {
  if (!GA_TRACKING_ID) return <></>
  return (
    <>
      {/*Global site tag (gtag.js) - Google Analytics*/}
      <Script
        src={'https://www.googletagmanager.com/gtag/js?id=' + GA_TRACKING_ID}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());
                    
                    gtag('config', '${GA_TRACKING_ID}');
                `}
      </Script>
    </>
  )
}

export default Analytics
