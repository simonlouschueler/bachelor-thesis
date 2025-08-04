<?php snippet('header') ?>

<?php $blocks = $site->content()->content()->toBlocks() ?>

<div class="side-nav" id="side-nav">
  <?php foreach ($blocks as $block): ?>
    <?php if ($block->type() === 'heading'): ?>
    <a href="#<?= str::slug($block->text()) ?>"<?= e($block->level() == 'h1', ' class="small-caps"') ?>">
      <?= $block->text() ?>
    </a>
    <?php endif ?>
  <?php endforeach ?>
  <a href="#appendix" class="small-caps">Appendix</a>
  <a href="#references">References</a>
</div>

<div class="info-panel">
  <p>
    <?= page('about')->text()->kt() ?>
  </p>
</div>

<article>
  <div class="title">
    <div>
      <?php
      $words = explode(' ', $site->headline()->value());
      foreach ($words as $word): ?>
        <span><?= $word ?></span>
      <?php endforeach ?>
    </div>
    <p><?= $site->subheadline()->kt()->inline() ?></p>
  </div>
  
<?php
  $chapterNumber = 0;
  
  foreach ($blocks as $block) {
      $data = ['block' => $block];
  
      if ($block->type() === 'heading' && $block->level() == 'h1') {
          $chapterNumber++;
          $data['chapterNumber'] = $chapterNumber;
      }
  
      snippet('blocks/' . $block->type(), $data);
  }
  ?>
  
  <hgroup id="appendix" class="scroll-section">
    <span class="small-caps">Appendix</span>
    <h1 id="references" class="scroll-section">References</h1>
  </hgroup>
  <?= $site->getBibliography() ?>

</article>

<?php snippet('footer') ?>