import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Ebin Reji | UI/UX Designer & Frontend Developer", 
  description = "Portfolio of Ebin Reji, a UI/UX Designer and Frontend Developer building engaging digital experiences.", 
  url = "https://3bin-05.github.io/portfoliov2/",
  image = "https://3bin-05.github.io/portfoliov2/antigravity.png"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://3bin-05.github.io/portfoliov2/#person",
        "name": "Ebin Reji",
        "jobTitle": "UI/UX Designer & Frontend Developer",
        "url": "https://3bin-05.github.io/portfoliov2/",
        "image": "https://3bin-05.github.io/portfoliov2/antigravity.png",
        "sameAs": [
          "https://github.com/3bin-05",
          "https://www.linkedin.com/in/ebin-reji",
          "https://x.com/simply_ebin05",
          "https://www.instagram.com/_simply._.ebin_"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://3bin-05.github.io/portfoliov2/#website",
        "url": "https://3bin-05.github.io/portfoliov2/",
        "name": "Ebin Reji Portfolio",
        "publisher": {
          "@id": "https://3bin-05.github.io/portfoliov2/#person"
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
