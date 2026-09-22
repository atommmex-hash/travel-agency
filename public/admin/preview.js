/* global CMS, createClass, h */
(function() {
  if (typeof CMS === 'undefined') return;

  function formatINR(val) {
    if (!val) return '₹0';
    return '₹' + Number(val).toLocaleString('en-IN');
  }

  // 1. TRIP PREVIEW COMPONENT
  var TripPreview = createClass({
    render: function() {
      var entry = this.props.entry;
      var getAsset = this.props.getAsset;
      var data = entry.get('data') ? entry.get('data').toJS() : {};

      var title = data.title || 'Untitled Trip';
      var destination = data.destination || 'Himalayas';
      var nights = data.nights || 1;
      var daysCount = Number(nights) + 1;
      var price = formatINR(data.pricePerPerson);
      var highestPoint = data.highestPointMetres ? data.highestPointMetres + 'm' : '';
      var tag = data.tag;
      var highlights = Array.isArray(data.highlights) ? data.highlights : [];
      var days = Array.isArray(data.days) ? data.days : [];
      var included = Array.isArray(data.included) ? data.included : [];

      var photoUrl = '';
      if (data.photo) {
        var asset = getAsset(data.photo);
        photoUrl = asset ? asset.toString() : data.photo;
      }

      return h('div', { className: 'preview-container' },
        h('div', { className: 'preview-header-tag' }, 'Live Card & Itinerary Preview'),

        // Trip Card
        h('div', { className: 'trip-card-preview' },
          h('div', { className: 'card-media-wrap' },
            photoUrl ? h('img', { src: photoUrl, alt: title }) : h('div', { className: 'card-media-placeholder' }, 'Himalayan Contour Graphic'),
            h('div', { className: 'card-badge-row' },
              tag ? h('span', { className: 'card-tag deal-flame' }, tag.toUpperCase()) : h('span', { className: 'card-tag' }, '4.9 ★ (120+)'),
              h('span', { className: 'card-meta-pill' }, nights + 'N / ' + daysCount + 'D')
            )
          ),
          h('div', { className: 'card-body' },
            h('h2', { className: 'card-title' }, title),
            h('div', { className: 'card-location-row' },
              h('span', null, '📍 ' + destination),
              highestPoint ? h('span', { className: 'alt-badge' }, '▲ ' + highestPoint) : null
            ),
            h('div', { className: 'card-price-row' },
              h('div', { className: 'price-block' },
                h('span', { className: 'price-num' }, price),
                h('span', { className: 'price-label' }, '/ person (twin sharing)')
              )
            ),

            highlights.length ? h('div', null,
              h('div', { className: 'card-section-label' }, 'Key Highlights'),
              h('ul', { className: 'card-highlights' },
                highlights.map(function(item, idx) {
                  var text = typeof item === 'string' ? item : (item && item.highlight ? item.highlight : '');
                  return h('li', { key: idx }, text);
                })
              )
            ) : null,

            days.length ? h('div', null,
              h('div', { className: 'card-section-label' }, 'Day-by-Day Itinerary (' + days.length + ' Days)'),
              h('div', { className: 'itinerary-preview-wrap' },
                days.map(function(d, idx) {
                  return h('div', { key: idx, className: 'day-card' },
                    h('div', { className: 'day-header' },
                      h('span', { className: 'day-label' }, d.label || ('Day ' + (idx + 1))),
                      h('span', { className: 'day-title' }, d.title || '')
                    ),
                    d.text ? h('p', { className: 'day-text' }, d.text) : null
                  );
                })
              )
            ) : null,

            included.length ? h('div', null,
              h('div', { className: 'card-section-label' }, 'Included in Package'),
              h('div', { className: 'inclusions-pills' },
                included.map(function(inc, idx) {
                  var incText = typeof inc === 'string' ? inc : (inc && inc.item ? inc.item : '');
                  return h('span', { key: idx, className: 'inclusion-pill' }, '✓ ' + incText);
                })
              )
            ) : null
          )
        )
      );
    }
  });

  // 2. PROMO BANNER PREVIEW COMPONENT
  var BannerPreview = createClass({
    render: function() {
      var entry = this.props.entry;
      var getAsset = this.props.getAsset;
      var data = entry.get('data') ? entry.get('data').toJS() : {};

      var bannersList = Array.isArray(data.banners) ? data.banners : (data.title ? [data] : []);

      return h('div', { className: 'preview-container' },
        h('div', { className: 'preview-header-tag' }, 'Live Hero Ad Banner Preview'),
        bannersList.map(function(b, idx) {
          var photoUrl = '';
          if (b.image) {
            var asset = getAsset(b.image);
            photoUrl = asset ? asset.toString() : b.image;
          }
          var perks = Array.isArray(b.perks) ? b.perks : [];

          return h('div', { key: idx, className: 'banner-preview-card' },
            photoUrl ? h('div', { className: 'banner-media-bg' }, h('img', { src: photoUrl, alt: b.alt || b.title })) : null,
            h('div', { className: 'banner-scrim' }),
            h('div', { className: 'banner-content' },
              b.badge ? h('span', { className: 'promo-badge badge-' + (b.badgeType || 'trending') }, b.badge) : null,
              h('h2', { className: 'banner-title' }, b.title || 'Promotional Headline'),
              b.subtitle ? h('p', { className: 'banner-subtitle' }, b.subtitle) : null,
              perks.length ? h('ul', { className: 'banner-perks' },
                perks.map(function(p, pIdx) {
                  var pText = typeof p === 'string' ? p : (p && p.perk ? p.perk : '');
                  return h('li', { key: pIdx }, pText);
                })
              ) : null,
              h('div', { className: 'banner-footer' },
                h('div', { className: 'banner-pricing' },
                  b.mrp ? h('span', { className: 'banner-mrp' }, b.mrp) : null,
                  h('div', { className: 'banner-price-row' },
                    h('strong', { className: 'banner-price-val' }, b.price || '₹0'),
                    h('span', { className: 'banner-price-unit' }, '/ person')
                  )
                ),
                h('div', { className: 'banner-btns' },
                  h('span', { className: 'mock-btn btn-gold' }, 'View Deal ›'),
                  h('span', { className: 'mock-btn btn-green' }, 'Instant Quote')
                )
              )
            )
          );
        })
      );
    }
  });

  CMS.registerPreviewStyle('/admin/preview.css');
  CMS.registerPreviewTemplate('trips', TripPreview);
  CMS.registerPreviewTemplate('banners', BannerPreview);
})();
