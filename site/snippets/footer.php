  </main>

  <footer>
    <div>
      <div class="badges">
        <?php foreach($site->content()->badges()->toFiles() as $badge): ?>
          <img src="<?= $badge->url() ?>" />
        <?php endforeach ?>
      </div>
      <nav>
        <span>© 2025 Simon Lou. All rights reserved.</span>
        <div>
          <a href="https://typo.social/@simonlou" target="_blank">Mastodon</a>
          <a href="https://simonlou.com/legal" target="_blank">Legal</a>
        </div>
      </nav>
    </div>
  </footer>
  
  <?= js([
    'assets/js/bibliography.js',
    'assets/js/side-nav.js',
    'assets/js/info-panel.js',
    'assets/js/sidenote.js'
  ]) ?>

</body>
</html>