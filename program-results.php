<div id="search-results" class="page page--full-width program-listing" data-t4-ajax-group="courseSearch" role="main">
  <article class="listing-page">
    <section class="su-listing">
      <div class="grid-container">
        <?php if (!empty($results)) : ?>
        <?php foreach ($results as $item) : ?>
        <article class="program-listing--item">
          <div class="program-listing--text-set__first text-margin-reset">

            <h3 class="h4 funderline"><a href="<?php echo $item['url']; ?>"><?php echo $item['programName']; ?></a></h3>

            <p><?php echo $item['programSummary']; ?></p>

            <div class="tags tags__links">
              <h4 class="tags__heading show-for-sr">Tags:</h4>
              <ul>
                <?php tags_list($item['programLevel'], $all_programs_section, 'programLevel', '|'); ?>
              </ul>
            </div>

          </div>

          <div class="program-listing--text-set__second text-margin-reset">

            <div class="program-types">
              <ul>
                <?php foreach (explode('|', $item['programType']) as $programType) : ?>
                <li><?php echo $programType; ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="program-degrees">
              <ul>
                <?php foreach (explode('|', $item['degree']) as $degree) : ?>
                <li><?php echo $degree; ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
          </div>

          <div class="program-listing--text-set__third">
            <div class="program-listing--checkbox">
              <input type="checkbox" id="checkbox-<?php echo $item['programID']; ?>">
              <label for="checkbox-<?php echo $item['programID']; ?>">Compare</label>
            </div>
            <a href="#sticky-panel" class="show-for-sr">Jump to the comparison panel</a>

          </div>

          <div class="program-listing--fields">

            <div class="program--level"><?php echo $item['programLevel']; ?></div>
            <div class="program--name"><?php echo $item['programName']; ?></div>
            <div class="program--summary"><?php echo $item['programSummary']; ?></div>
            <div class="program--types">
              <ul>
                <?php foreach (explode('|', $item['programType']) as $programType) : ?>
                <li><?php echo $programType; ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="program--degrees">
              <ul>
                <?php foreach (explode('|', $item['degree']) as $degree) : ?>
                <li><?php echo $degree; ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="program--duration"><?php echo $item['duration']; ?></div>
            <div class="program--credits"><?php echo $item['credits']; ?></div>
            <div class="program--format"><?php echo $item['learningFormat']; ?></div>
            <div class="program--areas-of-study">
              <ul>
                <?php foreach (explode('|', $item['areaOfStudy']) as $areaOfStudy) : ?>
                <li><?php echo $areaOfStudy; ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="program--url"><?php echo $item['url']; ?></div>
          </div>
        </article>
        <?php endforeach; ?>        
        <div class="pagination-box">
          <?php if (isset($paginationArray)) : ?>
          <div class="pagination-pages">
            <nav aria-label="pagination" class="pagination" data-t4-ajax-link="normal" data-t4-scroll="true">
              <?php foreach ($paginationArray as $paginationItem) : ?>
                <?php if ($paginationItem['current']) : ?>
                    <span class="currentpage"><a href=""><?php echo $paginationItem['text']; ?></a></span>
                <?php else : ?>
                    <a href="<?php echo $paginationItem['href']; ?>" class="<?php echo $paginationItem['class']; ?>">
                        <?php echo $paginationItem['text']; ?>
                    </a>
                <?php endif;?>
              <?php endforeach; ?>
            </nav>
          </div>
          <?php endif; ?>
        </div>
        <?php else : ?>
        <p style="text-align: center; padding: 30px; font-weight: bold;">No Results Found</p>
        <?php endif; ?>
      </div>
    </section>
  </article>
</div>
<div class="program-comparison--sticky-panel bg--dark" id="sticky-panel">
  <div id="compare-programs-0-4" class="accordion accordion--mobile" data-accordion-breakpoint="768">
    <button id="compare-programs-0--button-4" aria-controls="compare-programs-0--content" aria-expanded="true" data-toggle-type="menu" aria-label="Compare Programs (0)" class="accordion__button btn btn--small">
      <span class="accordion__button-text">Compare Programs (0)</span>

    </button>
    <div id="compare-programs-0--content" aria-labelledby="compare-programs-0--button-4" class="accordion__content">
      <div class="grid-container">
        <ul class="no-comparison">
          <li class="program-comparison--slot">
            <span class="btn">Program <span></span> of 3</span>
          </li>
          <li class="program-comparison--slot">
            <span class="btn">Program <span></span> of 3</span>
          </li>
          <li class="program-comparison--slot">
            <span class="btn">Program <span></span> of 3</span>
          </li>
        </ul>
        <button type="button" data-src="#program-comparison--modal" data-fancybox class="btn btn--inverse">Compare
          <span class="fas fa-arrow-right"></span></button>
      </div>

    </div>
  </div>
</div>

<div class="program-comparison--modal" id="program-comparison--modal" style="display: none;">
  <div class="swiper-container">
    <div class="slider-navigation">

      <button class="slider-navigation__prev"><i class="far fa-chevron-left" aria-hidden="true"></i><span class="show-for-sr">Go to the previous slide.</span></button>

      <button class="slider-navigation__next"><i class="far fa-chevron-right" aria-hidden="true"></i><span class="show-for-sr">Go to the next slide.</span></button>


      <div class="swiper-pagination swiper-pagination-fraction">
        <span class="swiper-pagination-current">1</span> of <span class="swiper-pagination-total"></span>
      </div>

    </div>
    <div class="swiper-wrapper" aria-live="polite">
    </div>
  </div>
</div>

