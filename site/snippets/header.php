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

    <a class="nav--logo <?= e($page->isHomePage(), 'is-home') ?>" href="<?= $site->url() ?>">
      <?= $site->logo()->toFiles()->first() ?>
    </a>
    
    <div class="nav--pages">
      <?php foreach ($site->children()->listed()->filterBy('template', '!=', 'project') as $item): ?>
      <a <?php e($item->isOpen(), 'aria-current="page"') ?> href="<?= $item->url() ?>"><?= $item->title() ?></a>
      <?php endforeach ?>
    </div>
  
  </header>

  <main class="main">
