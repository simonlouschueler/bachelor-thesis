<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>
    <?php
    $t1 = $site->title();
    $t2 = $page->title();
    $nicePageTitle = '';
    if ($page->isHomePage()) {
      $nicePageTitle = $t1 . ' · Simon Lou';
    } else {
      $nicePageTitle = $t2 . ' · ' . $t1;
    }
    echo $nicePageTitle;
    ?>
  </title>

  <meta name="description" content="<?= strip_tags($site->text()->kirbytext()) ?>">
  <meta name="author" content="Simon Lou">

  <meta property="og:type" content="website">
  <meta property="og:url" content="<?= $site->url() ?>">
  <meta property="og:title" content="<?= $site->title() ?>">
  <meta property="og:description" content="<?= strip_tags($site->text()->kirbytext()) ?>">
  <meta property="og:image" content="<?= $site->url() ?>/assets/favicon/social-preview.png">

  <meta name="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="<?= $site->url() ?>">
  <meta name="twitter:title" content="<?= $site->title() ?>">
  <meta name="twitter:description" content="<?= strip_tags($site->text()->kirbytext()) ?>">
  <meta name="twitter:image" content="<?= $site->url() ?>/assets/favicon/social-preview.png">

  <meta name="theme-color" content="#FDF9EE">

  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">

  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-dark-32x32.png" media="(prefers-color-scheme: dark)">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-dark-16x16.png" media="(prefers-color-scheme: dark)">
  <link rel="shortcut icon" href="/assets/favicon/favicon-dark.ico" media="(prefers-color-scheme: dark)">

  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-light-32x32.png" media="(prefers-color-scheme: light)">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-light-16x16.png" media="(prefers-color-scheme: light)">
  <link rel="shortcut icon" href="/assets/favicon/favicon-light.ico" media="(prefers-color-scheme: light)">

  <?= css('assets/css/style.css') ?>

</head>

<body>

  <header class="nav">
    
    <a id="info-button" class="active">
      <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M13 7.5v0c0 .55-.45 1-1 1 -.56 0-1-.45-1-1v0c0-.56.44-1 1-1 .55 0 1 .44 1 1Zm-3 3.75v0c0-.42.33-.75.75-.75h1.5v0c.41 0 .75.33.75.75v4.25h.75v0c.41 0 .75.33.75.75 0 .41-.34.75-.75.75h-3v0c-.42 0-.75-.34-.75-.75 0-.42.33-.75.75-.75h.75V12h-.75v0c-.42 0-.75-.34-.75-.75Z"/><path d="M12 1c6.07 0 11 4.925 11 11 0 6.07-4.93 11-11 11C5.92 23 1 18.07 1 12 1 5.92 5.925 1 12 1ZM2.5 12v0c0 5.24 4.25 9.5 9.5 9.5h0c5.24 0 9.5-4.26 9.5-9.5v0c0-5.25-4.26-9.5-9.5-9.5v0c-5.25 0-9.5 4.25-9.5 9.5Z"/> 
        </g>
      </svg>
    </a>
    
    <a id="close-info-button">
      <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M9.036 7.97l0-.001c-.31-.29-.78-.27-1.06.03 -.27.28-.27.73 0 1.02l2.963 2.96 -2.963 2.96h0c-.31.28-.32.75-.04 1.06 .28.3.75.31 1.06.03 .01-.02.02-.03.03-.04l2.96-2.97 2.96 2.96v0c.29.28.77.27 1.06-.02 .28-.3.28-.76 0-1.05l-2.97-2.97 2.96-2.97v0c.3-.29.31-.76.03-1.06 -.29-.31-.76-.32-1.06-.04 -.02.01-.03.02-.04.03l-2.97 2.963 -2.97-2.97Z"/><path d="M12 1c6.07 0 11 4.925 11 11 0 6.07-4.93 11-11 11C5.92 23 1 18.07 1 12 1 5.92 5.925 1 12 1ZM2.5 12v0c0 5.24 4.25 9.5 9.5 9.5h0c5.24 0 9.5-4.26 9.5-9.5v0c0-5.25-4.26-9.5-9.5-9.5v0c-5.25 0-9.5 4.25-9.5 9.5Z"/>
        </g>
      </svg>
    </a>
  
  </header>

  <main class="main">
