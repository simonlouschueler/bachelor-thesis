<?php snippet('header') ?>

<section class="about--text-image">
  <div>
    <p><?= $page->text()->kt()->inline()->bt()->mailto() ?></p>
    <div>
      <?php foreach ($page->socials()->toStructure() as $item): ?>
      <button><a href="<?= $item->link() ?>" target="blank"><?= $item->label() ?></a></button>
      <?php endforeach ?>
    </div>
  </div>
  <figure class="about--image"><?= $page->images()->template('about-image')->first() ?></figure>
</section>

<section class="list long no-images">
  <?php foreach ($page->cv()->toStructure() as $item): ?>
  <a href="<?= $item->link() ?>" target="_blank" class="list-item">
    <span><?= $item->title() ?></span>
    <span><?= $item->place() ?></span>
    <span><?= $item->type() ?></span>
    <span>
      <?= $item->start() ?><?php if ($item->timespan()->isTrue()): ?><?php if ($item->today()->isTrue()): ?> — today<?php else: ?> — <?= $item->end() ?><?php endif ?><?php endif ?>
    </span>
  </a>
  <?php endforeach ?>
</section>

<?php snippet('footer') ?>