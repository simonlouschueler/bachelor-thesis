<?php snippet('header') ?>

<?php $blocks = $site->content()->content()->toBlocks() ?>

<div class="side-nav" id="side-nav">
  <?php foreach ($blocks as $block): ?>
    <?php if ($block->type() === 'heading'): ?>
    <a href="#<?= str::slug($block->text()) ?>"<?= e($block->level() == 'h1', ' class="chapter"') ?>">
      <span><?= $block->text() ?></span>
      <?php if ($block->level() == 'h1'): ?>
      <div class="chevron">
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.78 12.78h0c-.3.29-.77.29-1.06 0L4.47 8.53v0c-.3-.3-.3-.77 0-1.06l4.25-4.25v0c.29-.28.75-.27 1.04.01v0c.28.28.29.74.01 1.04L6.05 7.99l3.72 3.72h0c.29.29.29.76-.001 1.06Z"/>
        </svg>
      </div>
      <?php endif ?>
    </a>
    <?php endif ?>
  <?php endforeach ?>
  <a href="#appendix" class="chapter">
    <span>Appendix</span>
    <div class="chevron">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.78 12.78h0c-.3.29-.77.29-1.06 0L4.47 8.53v0c-.3-.3-.3-.77 0-1.06l4.25-4.25v0c.29-.28.75-.27 1.04.01v0c.28.28.29.74.01 1.04L6.05 7.99l3.72 3.72h0c.29.29.29.76-.001 1.06Z"/>
      </svg>
    </div>
  </a>
  <a href="#references">
    <span>References</span>
  </a>
</div>

<div class="info-panel">
  <p>
    <?= page('about')->text()->kt() ?>
  </p>
</div>

<?php if ($pdf = $site->files()->template("pdf")->first()): ?>
  <a href="<?= $pdf->url() ?>" class="download-pdf-badge" target="_blank">
    <span>Download as PDF</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path><path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"></path></svg>
  </a>
<?php endif ?>

<script>
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelectorAll('.download-pdf-badge').forEach(el => {
        el.classList.add('visible');
      });
    }, 2000); // delay in ms (2 seconds)
  });
</script>

<article>
  <section class="hero-section">
    <div class="hero-section--logo">
      <div>
        <span>Bachelor Thesis</span>
        <span>Simon Lou</span>
      </div>
    </div>
    <div class="hero-section--title">
      <div>
        <?php
        $words = explode(' ', $site->headline()->value());
        foreach ($words as $word): ?>
          <span><?= $word ?></span>
        <?php endforeach ?>
      </div>
      <div>
        <p><?= $site->subheadline()->kt()->inline() ?></p>
        <button>
          <a href="#side-nav">
            <span>Start Reading</span>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.03 8.22v0c.29.29.29.76 0 1.06l-4.25 4.25v0c-.3.29-.77.29-1.06 0L3.47 9.28v0c-.28-.3-.27-.76.01-1.05v0c.28-.29.74-.3 1.04-.02l2.97 2.97V3.74h0c0-.42.33-.75.75-.75 .41 0 .75.33.75.75v7.44l2.97-2.97v0c.29-.3.76-.3 1.06 0Z"/></svg>
          </a>
        </button>
      </div>
    </div>
  </section>
  
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

<button id="back-to-citation">
  <a href="#reading-position">
    <span>Back to Citation</span>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3.47 7.78v0c-.3-.3-.3-.77-.001-1.06l4.25-4.25v0c.29-.3.76-.3 1.06-.001l4.25 4.25v0c.27.29.26.75-.02 1.04l0 0c-.29.28-.75.29-1.05.01L8.98 4.79v7.44 0c0 .41-.34.75-.75.75 -.42 0-.75-.34-.75-.75v-7.44l-2.97 2.97v0c-.3.29-.77.29-1.06 0Z"/></svg>
  </a>
</button>

<?php snippet('footer') ?>