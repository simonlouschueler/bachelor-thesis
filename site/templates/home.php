<?php snippet('header') ?>

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
  $blocks = $site->content()->content()->toBlocks();
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
  
  <hgroup>
    <span class="small-caps">Appendix</span>
    <h1>References</h1>
  </hgroup>
  <?= $site->getBibliography() ?>

</article>

<?php snippet('footer') ?>