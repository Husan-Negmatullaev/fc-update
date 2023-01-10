export async function pageMore() {
  const $filterContent = $(".properties-filter .properties__content")
    .isotope({
      itemSelector: ".properties__item",
    });

  $('.properties-filter__actions').on('click', 'button', function () {
    var sortValue = $(this).attr('data-filter');
    $filterContent.isotope({ filter: sortValue });
  });

  $('.properties-filter__actions').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });
  // }
}
