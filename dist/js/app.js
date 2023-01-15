(() => {
    var __webpack_modules__ = {
        63: module => {
            "use strict";
            module.exports = function equal(a, b) {
                if (a === b) return true;
                if (a && b && "object" == typeof a && "object" == typeof b) {
                    if (a.constructor !== b.constructor) return false;
                    var length, i, keys;
                    if (Array.isArray(a)) {
                        length = a.length;
                        if (length != b.length) return false;
                        for (i = length; 0 !== i--; ) if (!equal(a[i], b[i])) return false;
                        return true;
                    }
                    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
                    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
                    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
                    keys = Object.keys(a);
                    length = keys.length;
                    if (length !== Object.keys(b).length) return false;
                    for (i = length; 0 !== i--; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
                    for (i = length; 0 !== i--; ) {
                        var key = keys[i];
                        if (!equal(a[key], b[key])) return false;
                    }
                    return true;
                }
                return a !== a && b !== b;
            };
        },
        97: function(module) {
            /**
 * lightgallery | 2.7.1 | January 11th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
            !function(t, e) {
                true ? module.exports = e() : 0;
            }(0, (function() {
                "use strict";
                var t = function() {
                    return (t = Object.assign || function(t) {
                        for (var e, i = 1, s = arguments.length; i < s; i++) for (var h in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, h) && (t[h] = e[h]);
                        return t;
                    }).apply(this, arguments);
                }, e = {
                    thumbnail: !0,
                    animateThumb: !0,
                    currentPagerPosition: "middle",
                    alignThumbnails: "middle",
                    thumbWidth: 100,
                    thumbHeight: "80px",
                    thumbMargin: 5,
                    appendThumbnailsTo: ".lg-components",
                    toggleThumb: !1,
                    enableThumbDrag: !0,
                    enableThumbSwipe: !0,
                    thumbnailSwipeThreshold: 10,
                    loadYouTubeThumbnail: !0,
                    youTubeThumbSize: 1,
                    thumbnailPluginStrings: {
                        toggleThumbnails: "Toggle thumbnails"
                    }
                }, i = "lgContainerResize", s = "lgUpdateSlides", h = "lgBeforeOpen", n = "lgBeforeSlide";
                return function() {
                    function o(t, e) {
                        return this.thumbOuterWidth = 0, this.thumbTotalWidth = 0, this.translateX = 0, 
                        this.thumbClickable = !1, this.core = t, this.$LG = e, this;
                    }
                    return o.prototype.init = function() {
                        this.settings = t(t({}, e), this.core.settings), this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.galleryItems.length * (this.settings.thumbWidth + this.settings.thumbMargin), 
                        this.translateX = 0, this.setAnimateThumbStyles(), this.core.settings.allowMediaOverlap || (this.settings.toggleThumb = !1), 
                        this.settings.thumbnail && (this.build(), this.settings.animateThumb ? (this.settings.enableThumbDrag && this.enableThumbDrag(), 
                        this.settings.enableThumbSwipe && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, 
                        this.toggleThumbBar(), this.thumbKeyPress());
                    }, o.prototype.build = function() {
                        var t = this;
                        this.setThumbMarkup(), this.manageActiveClassOnSlideChange(), this.$lgThumb.first().on("click.lg touchend.lg", (function(e) {
                            var i = t.$LG(e.target);
                            i.hasAttribute("data-lg-item-id") && setTimeout((function() {
                                if (t.thumbClickable && !t.core.lgBusy) {
                                    var e = parseInt(i.attr("data-lg-item-id"));
                                    t.core.slide(e, !1, !0, !1);
                                }
                            }), 50);
                        })), this.core.LGel.on(n + ".thumb", (function(e) {
                            var i = e.detail.index;
                            t.animateThumb(i);
                        })), this.core.LGel.on(h + ".thumb", (function() {
                            t.thumbOuterWidth = t.core.outer.get().offsetWidth;
                        })), this.core.LGel.on(s + ".thumb", (function() {
                            t.rebuildThumbnails();
                        })), this.core.LGel.on(i + ".thumb", (function() {
                            t.core.lgOpened && setTimeout((function() {
                                t.thumbOuterWidth = t.core.outer.get().offsetWidth, t.animateThumb(t.core.index), 
                                t.thumbOuterWidth = t.core.outer.get().offsetWidth;
                            }), 50);
                        }));
                    }, o.prototype.setThumbMarkup = function() {
                        var t = "lg-thumb-outer ";
                        this.settings.alignThumbnails && (t += "lg-thumb-align-" + this.settings.alignThumbnails);
                        var e = '<div class="' + t + '">\n        <div class="lg-thumb lg-group">\n        </div>\n        </div>';
                        this.core.outer.addClass("lg-has-thumb"), ".lg-components" === this.settings.appendThumbnailsTo ? this.core.$lgComponents.append(e) : this.core.outer.append(e), 
                        this.$thumbOuter = this.core.outer.find(".lg-thumb-outer").first(), this.$lgThumb = this.core.outer.find(".lg-thumb").first(), 
                        this.settings.animateThumb && this.core.outer.find(".lg-thumb").css("transition-duration", this.core.settings.speed + "ms").css("width", this.thumbTotalWidth + "px").css("position", "relative"), 
                        this.setThumbItemHtml(this.core.galleryItems);
                    }, o.prototype.enableThumbDrag = function() {
                        var t = this, e = {
                            cords: {
                                startX: 0,
                                endX: 0
                            },
                            isMoved: !1,
                            newTranslateX: 0,
                            startTime: new Date,
                            endTime: new Date,
                            touchMoveTime: 0
                        }, i = !1;
                        this.$thumbOuter.addClass("lg-grab"), this.core.outer.find(".lg-thumb").first().on("mousedown.lg.thumb", (function(s) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (s.preventDefault(), e.cords.startX = s.pageX, 
                            e.startTime = new Date, t.thumbClickable = !1, i = !0, t.core.outer.get().scrollLeft += 1, 
                            t.core.outer.get().scrollLeft -= 1, t.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"));
                        })), this.$LG(window).on("mousemove.lg.thumb.global" + this.core.lgId, (function(s) {
                            t.core.lgOpened && i && (e.cords.endX = s.pageX, e = t.onThumbTouchMove(e));
                        })), this.$LG(window).on("mouseup.lg.thumb.global" + this.core.lgId, (function() {
                            t.core.lgOpened && (e.isMoved ? e = t.onThumbTouchEnd(e) : t.thumbClickable = !0, 
                            i && (i = !1, t.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab")));
                        }));
                    }, o.prototype.enableThumbSwipe = function() {
                        var t = this, e = {
                            cords: {
                                startX: 0,
                                endX: 0
                            },
                            isMoved: !1,
                            newTranslateX: 0,
                            startTime: new Date,
                            endTime: new Date,
                            touchMoveTime: 0
                        };
                        this.$lgThumb.on("touchstart.lg", (function(i) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (i.preventDefault(), e.cords.startX = i.targetTouches[0].pageX, 
                            t.thumbClickable = !1, e.startTime = new Date);
                        })), this.$lgThumb.on("touchmove.lg", (function(i) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (i.preventDefault(), e.cords.endX = i.targetTouches[0].pageX, 
                            e = t.onThumbTouchMove(e));
                        })), this.$lgThumb.on("touchend.lg", (function() {
                            e.isMoved ? e = t.onThumbTouchEnd(e) : t.thumbClickable = !0;
                        }));
                    }, o.prototype.rebuildThumbnails = function() {
                        var t = this;
                        this.$thumbOuter.addClass("lg-rebuilding-thumbnails"), setTimeout((function() {
                            t.thumbTotalWidth = t.core.galleryItems.length * (t.settings.thumbWidth + t.settings.thumbMargin), 
                            t.$lgThumb.css("width", t.thumbTotalWidth + "px"), t.$lgThumb.empty(), t.setThumbItemHtml(t.core.galleryItems), 
                            t.animateThumb(t.core.index);
                        }), 50), setTimeout((function() {
                            t.$thumbOuter.removeClass("lg-rebuilding-thumbnails");
                        }), 200);
                    }, o.prototype.setTranslate = function(t) {
                        this.$lgThumb.css("transform", "translate3d(-" + t + "px, 0px, 0px)");
                    }, o.prototype.getPossibleTransformX = function(t) {
                        return t > this.thumbTotalWidth - this.thumbOuterWidth && (t = this.thumbTotalWidth - this.thumbOuterWidth), 
                        t < 0 && (t = 0), t;
                    }, o.prototype.animateThumb = function(t) {
                        if (this.$lgThumb.css("transition-duration", this.core.settings.speed + "ms"), this.settings.animateThumb) {
                            var e = 0;
                            switch (this.settings.currentPagerPosition) {
                              case "left":
                                e = 0;
                                break;

                              case "middle":
                                e = this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
                                break;

                              case "right":
                                e = this.thumbOuterWidth - this.settings.thumbWidth;
                            }
                            this.translateX = (this.settings.thumbWidth + this.settings.thumbMargin) * t - 1 - e, 
                            this.translateX > this.thumbTotalWidth - this.thumbOuterWidth && (this.translateX = this.thumbTotalWidth - this.thumbOuterWidth), 
                            this.translateX < 0 && (this.translateX = 0), this.setTranslate(this.translateX);
                        }
                    }, o.prototype.onThumbTouchMove = function(t) {
                        return t.newTranslateX = this.translateX, t.isMoved = !0, t.touchMoveTime = (new Date).valueOf(), 
                        t.newTranslateX -= t.cords.endX - t.cords.startX, t.newTranslateX = this.getPossibleTransformX(t.newTranslateX), 
                        this.setTranslate(t.newTranslateX), this.$thumbOuter.addClass("lg-dragging"), t;
                    }, o.prototype.onThumbTouchEnd = function(t) {
                        t.isMoved = !1, t.endTime = new Date, this.$thumbOuter.removeClass("lg-dragging");
                        var e = t.endTime.valueOf() - t.startTime.valueOf(), i = t.cords.endX - t.cords.startX, s = Math.abs(i) / e;
                        return s > .15 && t.endTime.valueOf() - t.touchMoveTime < 30 ? ((s += 1) > 2 && (s += 1), 
                        s += s * (Math.abs(i) / this.thumbOuterWidth), this.$lgThumb.css("transition-duration", Math.min(s - 1, 2) + "settings"), 
                        i *= s, this.translateX = this.getPossibleTransformX(this.translateX - i), this.setTranslate(this.translateX)) : this.translateX = t.newTranslateX, 
                        Math.abs(t.cords.endX - t.cords.startX) < this.settings.thumbnailSwipeThreshold && (this.thumbClickable = !0), 
                        t;
                    }, o.prototype.getThumbHtml = function(t, e) {
                        var i, s = this.core.galleryItems[e].__slideVideoInfo || {};
                        return i = s.youtube && this.settings.loadYouTubeThumbnail ? "//img.youtube.com/vi/" + s.youtube[1] + "/" + this.settings.youTubeThumbSize + ".jpg" : t, 
                        '<div data-lg-item-id="' + e + '" class="lg-thumb-item ' + (e === this.core.index ? " active" : "") + '" \n        style="width:' + this.settings.thumbWidth + "px; height: " + this.settings.thumbHeight + ";\n            margin-right: " + this.settings.thumbMargin + 'px;">\n            <img data-lg-item-id="' + e + '" src="' + i + '" />\n        </div>';
                    }, o.prototype.getThumbItemHtml = function(t) {
                        for (var e = "", i = 0; i < t.length; i++) e += this.getThumbHtml(t[i].thumb, i);
                        return e;
                    }, o.prototype.setThumbItemHtml = function(t) {
                        var e = this.getThumbItemHtml(t);
                        this.$lgThumb.html(e);
                    }, o.prototype.setAnimateThumbStyles = function() {
                        this.settings.animateThumb && this.core.outer.addClass("lg-animate-thumb");
                    }, o.prototype.manageActiveClassOnSlideChange = function() {
                        var t = this;
                        this.core.LGel.on(n + ".thumb", (function(e) {
                            var i = t.core.outer.find(".lg-thumb-item"), s = e.detail.index;
                            i.removeClass("active"), i.eq(s).addClass("active");
                        }));
                    }, o.prototype.toggleThumbBar = function() {
                        var t = this;
                        this.settings.toggleThumb && (this.core.outer.addClass("lg-can-toggle"), this.core.$toolbar.append('<button type="button" aria-label="' + this.settings.thumbnailPluginStrings.toggleThumbnails + '" class="lg-toggle-thumb lg-icon"></button>'), 
                        this.core.outer.find(".lg-toggle-thumb").first().on("click.lg", (function() {
                            t.core.outer.toggleClass("lg-components-open");
                        })));
                    }, o.prototype.thumbKeyPress = function() {
                        var t = this;
                        this.$LG(window).on("keydown.lg.thumb.global" + this.core.lgId, (function(e) {
                            t.core.lgOpened && t.settings.toggleThumb && (38 === e.keyCode ? (e.preventDefault(), 
                            t.core.outer.addClass("lg-components-open")) : 40 === e.keyCode && (e.preventDefault(), 
                            t.core.outer.removeClass("lg-components-open")));
                        }));
                    }, o.prototype.destroy = function() {
                        this.settings.thumbnail && (this.$LG(window).off(".lg.thumb.global" + this.core.lgId), 
                        this.core.LGel.off(".lg.thumb"), this.core.LGel.off(".thumb"), this.$thumbOuter.remove(), 
                        this.core.outer.removeClass("lg-has-thumb"));
                    }, o;
                }();
            }));
        },
        86: function(module) {
            /**
 * lightgallery | 2.7.1 | January 11th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
            !function(e, t) {
                true ? module.exports = t() : 0;
            }(0, (function() {
                "use strict";
                var e = function() {
                    return (e = Object.assign || function(e) {
                        for (var t, o = 1, i = arguments.length; o < i; o++) for (var s in t = arguments[o]) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                        return e;
                    }).apply(this, arguments);
                }, t = {
                    scale: 1,
                    zoom: !0,
                    actualSize: !0,
                    showZoomInOutIcons: !1,
                    actualSizeIcons: {
                        zoomIn: "lg-zoom-in",
                        zoomOut: "lg-zoom-out"
                    },
                    enableZoomAfter: 300,
                    zoomPluginStrings: {
                        zoomIn: "Zoom in",
                        zoomOut: "Zoom out",
                        viewActualSize: "View actual size"
                    }
                }, o = "lgContainerResize", i = "lgBeforeOpen", s = "lgAfterOpen", a = "lgSlideItemLoad", n = "lgAfterSlide", r = "lgRotateLeft", l = "lgRotateRight", c = "lgFlipHorizontal", g = "lgFlipVertical";
                return function() {
                    function h(o, i) {
                        return this.core = o, this.$LG = i, this.settings = e(e({}, t), this.core.settings), 
                        this;
                    }
                    return h.prototype.buildTemplates = function() {
                        var e = this.settings.showZoomInOutIcons ? '<button id="' + this.core.getIdName("lg-zoom-in") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.zoomIn + '" class="lg-zoom-in lg-icon"></button><button id="' + this.core.getIdName("lg-zoom-out") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.zoomIn + '" class="lg-zoom-out lg-icon"></button>' : "";
                        this.settings.actualSize && (e += '<button id="' + this.core.getIdName("lg-actual-size") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.viewActualSize + '" class="' + this.settings.actualSizeIcons.zoomIn + ' lg-icon"></button>'), 
                        this.core.outer.addClass("lg-use-transition-for-zoom"), this.core.$toolbar.first().append(e);
                    }, h.prototype.enableZoom = function(e) {
                        var t = this, o = this.settings.enableZoomAfter + e.detail.delay;
                        this.$LG("body").first().hasClass("lg-from-hash") && e.detail.delay ? o = 0 : this.$LG("body").first().removeClass("lg-from-hash"), 
                        this.zoomableTimeout = setTimeout((function() {
                            t.isImageSlide(t.core.index) && (t.core.getSlideItem(e.detail.index).addClass("lg-zoomable"), 
                            e.detail.index === t.core.index && t.setZoomEssentials());
                        }), o + 30);
                    }, h.prototype.enableZoomOnSlideItemLoad = function() {
                        this.core.LGel.on(a + ".zoom", this.enableZoom.bind(this));
                    }, h.prototype.getDragCords = function(e) {
                        return {
                            x: e.pageX,
                            y: e.pageY
                        };
                    }, h.prototype.getSwipeCords = function(e) {
                        return {
                            x: e.touches[0].pageX,
                            y: e.touches[0].pageY
                        };
                    }, h.prototype.getDragAllowedAxises = function(e, t) {
                        var o = this.core.getSlideItem(this.core.index).find(".lg-image").first().get(), i = 0, s = 0, a = o.getBoundingClientRect();
                        e ? (i = o.offsetHeight * e, s = o.offsetWidth * e) : t ? (i = a.height + t * a.height, 
                        s = a.width + t * a.width) : (i = a.height, s = a.width);
                        var n = i > this.containerRect.height;
                        return {
                            allowX: s > this.containerRect.width,
                            allowY: n
                        };
                    }, h.prototype.setZoomEssentials = function() {
                        this.containerRect = this.core.$content.get().getBoundingClientRect();
                    }, h.prototype.zoomImage = function(e, t, o, i) {
                        if (!(Math.abs(t) <= 0)) {
                            var s, a, n = this.containerRect.width / 2 + this.containerRect.left, r = this.containerRect.height / 2 + this.containerRect.top + this.scrollTop;
                            1 === e && (this.positionChanged = !1);
                            var l = this.getDragAllowedAxises(0, t), c = l.allowY, g = l.allowX;
                            this.positionChanged && (s = this.left / (this.scale - t), a = this.top / (this.scale - t), 
                            this.pageX = n - s, this.pageY = r - a, this.positionChanged = !1);
                            var h, m, u = this.getPossibleSwipeDragCords(t), d = n - this.pageX, f = r - this.pageY;
                            if (e - t > 1) {
                                var p = (e - t) / Math.abs(t);
                                h = (d = (t < 0 ? -d : d) + this.left * (p + (t < 0 ? -1 : 1))) / p, m = (f = (t < 0 ? -f : f) + this.top * (p + (t < 0 ? -1 : 1))) / p;
                            } else h = d * (p = (e - t) * t), m = f * p;
                            o && (g ? this.isBeyondPossibleLeft(h, u.minX) ? h = u.minX : this.isBeyondPossibleRight(h, u.maxX) && (h = u.maxX) : e > 1 && (h < u.minX ? h = u.minX : h > u.maxX && (h = u.maxX)), 
                            c ? this.isBeyondPossibleTop(m, u.minY) ? m = u.minY : this.isBeyondPossibleBottom(m, u.maxY) && (m = u.maxY) : e > 1 && (m < u.minY ? m = u.minY : m > u.maxY && (m = u.maxY))), 
                            this.setZoomStyles({
                                x: h,
                                y: m,
                                scale: e
                            }), this.left = h, this.top = m, i && this.setZoomImageSize();
                        }
                    }, h.prototype.resetImageTranslate = function(e) {
                        if (this.isImageSlide(e)) {
                            var t = this.core.getSlideItem(e).find(".lg-image").first();
                            this.imageReset = !1, t.removeClass("reset-transition reset-transition-y reset-transition-x"), 
                            this.core.outer.removeClass("lg-actual-size"), t.css("width", "auto").css("height", "auto"), 
                            setTimeout((function() {
                                t.removeClass("no-transition");
                            }), 10);
                        }
                    }, h.prototype.setZoomImageSize = function() {
                        var e = this, t = this.core.getSlideItem(this.core.index).find(".lg-image").first();
                        setTimeout((function() {
                            var o = e.getCurrentImageActualSizeScale();
                            e.scale >= o && (t.addClass("no-transition"), e.imageReset = !0);
                        }), 500), setTimeout((function() {
                            var o = e.getCurrentImageActualSizeScale();
                            if (e.scale >= o) {
                                var i = e.getDragAllowedAxises(e.scale);
                                t.css("width", t.get().naturalWidth + "px").css("height", t.get().naturalHeight + "px"), 
                                e.core.outer.addClass("lg-actual-size"), i.allowX && i.allowY ? t.addClass("reset-transition") : i.allowX && !i.allowY ? t.addClass("reset-transition-x") : !i.allowX && i.allowY && t.addClass("reset-transition-y");
                            }
                        }), 550);
                    }, h.prototype.setZoomStyles = function(e) {
                        var t = this.core.getSlideItem(this.core.index).find(".lg-img-wrap").first(), o = this.core.getSlideItem(this.core.index).find(".lg-image").first(), i = this.core.outer.find(".lg-current .lg-dummy-img").first();
                        this.scale = e.scale, o.css("transform", "scale3d(" + e.scale + ", " + e.scale + ", 1)"), 
                        i.css("transform", "scale3d(" + e.scale + ", " + e.scale + ", 1)");
                        var s = "translate3d(" + e.x + "px, " + e.y + "px, 0)";
                        t.css("transform", s);
                    }, h.prototype.setActualSize = function(e, t) {
                        var o = this, i = this.core.galleryItems[this.core.index];
                        this.resetImageTranslate(e), setTimeout((function() {
                            if (i.src && !o.core.outer.hasClass("lg-first-slide-loading")) {
                                var e = o.getCurrentImageActualSizeScale(), s = o.scale;
                                o.core.outer.hasClass("lg-zoomed") ? o.scale = 1 : o.scale = o.getScale(e), o.setPageCords(t), 
                                o.beginZoom(o.scale), o.zoomImage(o.scale, o.scale - s, !0, !0), setTimeout((function() {
                                    o.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
                                }), 10);
                            }
                        }), 50);
                    }, h.prototype.getNaturalWidth = function(e) {
                        var t = this.core.getSlideItem(e).find(".lg-image").first(), o = this.core.galleryItems[e].width;
                        return o ? parseFloat(o) : t.get().naturalWidth;
                    }, h.prototype.getActualSizeScale = function(e, t) {
                        return e >= t ? e / t || 2 : 1;
                    }, h.prototype.getCurrentImageActualSizeScale = function() {
                        var e = this.core.getSlideItem(this.core.index).find(".lg-image").first().get().offsetWidth, t = this.getNaturalWidth(this.core.index) || e;
                        return this.getActualSizeScale(t, e);
                    }, h.prototype.getPageCords = function(e) {
                        var t = {};
                        if (e) t.x = e.pageX || e.touches[0].pageX, t.y = e.pageY || e.touches[0].pageY; else {
                            var o = this.core.$content.get().getBoundingClientRect();
                            t.x = o.width / 2 + o.left, t.y = o.height / 2 + this.scrollTop + o.top;
                        }
                        return t;
                    }, h.prototype.setPageCords = function(e) {
                        var t = this.getPageCords(e);
                        this.pageX = t.x, this.pageY = t.y;
                    }, h.prototype.manageActualPixelClassNames = function() {
                        this.core.getElementById("lg-actual-size").removeClass(this.settings.actualSizeIcons.zoomIn).addClass(this.settings.actualSizeIcons.zoomOut);
                    }, h.prototype.beginZoom = function(e) {
                        return this.core.outer.removeClass("lg-zoom-drag-transition lg-zoom-dragging"), 
                        e > 1 ? (this.core.outer.addClass("lg-zoomed"), this.manageActualPixelClassNames()) : this.resetZoom(), 
                        e > 1;
                    }, h.prototype.getScale = function(e) {
                        var t = this.getCurrentImageActualSizeScale();
                        return e < 1 ? e = 1 : e > t && (e = t), e;
                    }, h.prototype.init = function() {
                        var e = this;
                        if (this.settings.zoom) {
                            this.buildTemplates(), this.enableZoomOnSlideItemLoad();
                            var t = null;
                            this.core.outer.on("dblclick.lg", (function(t) {
                                e.$LG(t.target).hasClass("lg-image") && e.setActualSize(e.core.index, t);
                            })), this.core.outer.on("touchstart.lg", (function(o) {
                                var i = e.$LG(o.target);
                                1 === o.touches.length && i.hasClass("lg-image") && (t ? (clearTimeout(t), t = null, 
                                o.preventDefault(), e.setActualSize(e.core.index, o)) : t = setTimeout((function() {
                                    t = null;
                                }), 300));
                            })), this.core.LGel.on(o + ".zoom " + l + ".zoom " + r + ".zoom " + c + ".zoom " + g + ".zoom", (function() {
                                if (e.core.lgOpened && e.isImageSlide(e.core.index) && !e.core.touchAction) {
                                    var t = e.core.getSlideItem(e.core.index).find(".lg-img-wrap").first();
                                    e.top = 0, e.left = 0, e.setZoomEssentials(), e.setZoomSwipeStyles(t, {
                                        x: 0,
                                        y: 0
                                    }), e.positionChanged = !0;
                                }
                            })), this.$LG(window).on("scroll.lg.zoom.global" + this.core.lgId, (function() {
                                e.core.lgOpened && (e.scrollTop = e.$LG(window).scrollTop());
                            })), this.core.getElementById("lg-zoom-out").on("click.lg", (function() {
                                if (e.isImageSlide(e.core.index)) {
                                    var t = 0;
                                    e.imageReset && (e.resetImageTranslate(e.core.index), t = 50), setTimeout((function() {
                                        var t = e.scale - e.settings.scale;
                                        t < 1 && (t = 1), e.beginZoom(t), e.zoomImage(t, -e.settings.scale, !0, !0);
                                    }), t);
                                }
                            })), this.core.getElementById("lg-zoom-in").on("click.lg", (function() {
                                e.zoomIn();
                            })), this.core.getElementById("lg-actual-size").on("click.lg", (function() {
                                e.setActualSize(e.core.index);
                            })), this.core.LGel.on(i + ".zoom", (function() {
                                e.core.outer.find(".lg-item").removeClass("lg-zoomable");
                            })), this.core.LGel.on(s + ".zoom", (function() {
                                e.scrollTop = e.$LG(window).scrollTop(), e.pageX = e.core.outer.width() / 2, e.pageY = e.core.outer.height() / 2 + e.scrollTop, 
                                e.scale = 1;
                            })), this.core.LGel.on(n + ".zoom", (function(t) {
                                var o = t.detail.prevIndex;
                                e.scale = 1, e.positionChanged = !1, e.resetZoom(o), e.resetImageTranslate(o), e.isImageSlide(e.core.index) && e.setZoomEssentials();
                            })), this.zoomDrag(), this.pinchZoom(), this.zoomSwipe(), this.zoomableTimeout = !1, 
                            this.positionChanged = !1;
                        }
                    }, h.prototype.zoomIn = function() {
                        if (this.isImageSlide(this.core.index)) {
                            var e = this.scale + this.settings.scale;
                            e = this.getScale(e), this.beginZoom(e), this.zoomImage(e, Math.min(this.settings.scale, e - this.scale), !0, !0);
                        }
                    }, h.prototype.resetZoom = function(e) {
                        this.core.outer.removeClass("lg-zoomed lg-zoom-drag-transition");
                        var t = this.core.getElementById("lg-actual-size"), o = this.core.getSlideItem(void 0 !== e ? e : this.core.index);
                        t.removeClass(this.settings.actualSizeIcons.zoomOut).addClass(this.settings.actualSizeIcons.zoomIn), 
                        o.find(".lg-img-wrap").first().removeAttr("style"), o.find(".lg-image").first().removeAttr("style"), 
                        this.scale = 1, this.left = 0, this.top = 0, this.setPageCords();
                    }, h.prototype.getTouchDistance = function(e) {
                        return Math.sqrt((e.touches[0].pageX - e.touches[1].pageX) * (e.touches[0].pageX - e.touches[1].pageX) + (e.touches[0].pageY - e.touches[1].pageY) * (e.touches[0].pageY - e.touches[1].pageY));
                    }, h.prototype.pinchZoom = function() {
                        var e = this, t = 0, o = !1, i = 1, s = 0, a = this.core.getSlideItem(this.core.index);
                        this.core.outer.on("touchstart.lg", (function(o) {
                            if (a = e.core.getSlideItem(e.core.index), e.isImageSlide(e.core.index) && 2 === o.touches.length) {
                                if (o.preventDefault(), e.core.outer.hasClass("lg-first-slide-loading")) return;
                                i = e.scale || 1, e.core.outer.removeClass("lg-zoom-drag-transition lg-zoom-dragging"), 
                                e.setPageCords(o), e.resetImageTranslate(e.core.index), e.core.touchAction = "pinch", 
                                t = e.getTouchDistance(o);
                            }
                        })), this.core.$inner.on("touchmove.lg", (function(n) {
                            if (2 === n.touches.length && "pinch" === e.core.touchAction && (e.$LG(n.target).hasClass("lg-item") || a.get().contains(n.target))) {
                                n.preventDefault();
                                var r = e.getTouchDistance(n), l = t - r;
                                if (!o && Math.abs(l) > 5 && (o = !0), o) {
                                    s = e.scale;
                                    var c = Math.max(1, i + .02 * -l);
                                    e.scale = Math.round(100 * (c + Number.EPSILON)) / 100;
                                    var g = e.scale - s;
                                    e.zoomImage(e.scale, Math.round(100 * (g + Number.EPSILON)) / 100, !1, !1);
                                }
                            }
                        })), this.core.$inner.on("touchend.lg", (function(i) {
                            if ("pinch" === e.core.touchAction && (e.$LG(i.target).hasClass("lg-item") || a.get().contains(i.target))) {
                                if (o = !1, t = 0, e.scale <= 1) e.resetZoom(); else {
                                    var s = e.getCurrentImageActualSizeScale();
                                    if (e.scale >= s) {
                                        var n = s - e.scale;
                                        0 === n && (n = .01), e.zoomImage(s, n, !1, !0);
                                    }
                                    e.manageActualPixelClassNames(), e.core.outer.addClass("lg-zoomed");
                                }
                                e.core.touchAction = void 0;
                            }
                        }));
                    }, h.prototype.touchendZoom = function(e, t, o, i, s) {
                        var a = t.x - e.x, n = t.y - e.y, r = Math.abs(a) / s + 1, l = Math.abs(n) / s + 1;
                        r > 2 && (r += 1), l > 2 && (l += 1), a *= r, n *= l;
                        var c = this.core.getSlideItem(this.core.index).find(".lg-img-wrap").first(), g = {};
                        g.x = this.left + a, g.y = this.top + n;
                        var h = this.getPossibleSwipeDragCords();
                        (Math.abs(a) > 15 || Math.abs(n) > 15) && (i && (this.isBeyondPossibleTop(g.y, h.minY) ? g.y = h.minY : this.isBeyondPossibleBottom(g.y, h.maxY) && (g.y = h.maxY)), 
                        o && (this.isBeyondPossibleLeft(g.x, h.minX) ? g.x = h.minX : this.isBeyondPossibleRight(g.x, h.maxX) && (g.x = h.maxX)), 
                        i ? this.top = g.y : g.y = this.top, o ? this.left = g.x : g.x = this.left, this.setZoomSwipeStyles(c, g), 
                        this.positionChanged = !0);
                    }, h.prototype.getZoomSwipeCords = function(e, t, o, i, s) {
                        var a = {};
                        if (i) {
                            if (a.y = this.top + (t.y - e.y), this.isBeyondPossibleTop(a.y, s.minY)) {
                                var n = s.minY - a.y;
                                a.y = s.minY - n / 6;
                            } else if (this.isBeyondPossibleBottom(a.y, s.maxY)) {
                                var r = a.y - s.maxY;
                                a.y = s.maxY + r / 6;
                            }
                        } else a.y = this.top;
                        if (o) {
                            if (a.x = this.left + (t.x - e.x), this.isBeyondPossibleLeft(a.x, s.minX)) {
                                var l = s.minX - a.x;
                                a.x = s.minX - l / 6;
                            } else if (this.isBeyondPossibleRight(a.x, s.maxX)) {
                                var c = a.x - s.maxX;
                                a.x = s.maxX + c / 6;
                            }
                        } else a.x = this.left;
                        return a;
                    }, h.prototype.isBeyondPossibleLeft = function(e, t) {
                        return e >= t;
                    }, h.prototype.isBeyondPossibleRight = function(e, t) {
                        return e <= t;
                    }, h.prototype.isBeyondPossibleTop = function(e, t) {
                        return e >= t;
                    }, h.prototype.isBeyondPossibleBottom = function(e, t) {
                        return e <= t;
                    }, h.prototype.isImageSlide = function(e) {
                        var t = this.core.galleryItems[e];
                        return "image" === this.core.getSlideType(t);
                    }, h.prototype.getPossibleSwipeDragCords = function(e) {
                        var t = this.core.getSlideItem(this.core.index).find(".lg-image").first(), o = this.core.mediaContainerPosition.bottom, i = t.get().getBoundingClientRect(), s = i.height, a = i.width;
                        return e && (s += e * s, a += e * a), {
                            minY: (s - this.containerRect.height) / 2,
                            maxY: (this.containerRect.height - s) / 2 + o,
                            minX: (a - this.containerRect.width) / 2,
                            maxX: (this.containerRect.width - a) / 2
                        };
                    }, h.prototype.setZoomSwipeStyles = function(e, t) {
                        e.css("transform", "translate3d(" + t.x + "px, " + t.y + "px, 0)");
                    }, h.prototype.zoomSwipe = function() {
                        var e, t, o = this, i = {}, s = {}, a = !1, n = !1, r = !1, l = new Date, c = (new Date, 
                        this.core.getSlideItem(this.core.index));
                        this.core.$inner.on("touchstart.lg", (function(s) {
                            if (o.isImageSlide(o.core.index) && (c = o.core.getSlideItem(o.core.index), (o.$LG(s.target).hasClass("lg-item") || c.get().contains(s.target)) && 1 === s.touches.length && o.core.outer.hasClass("lg-zoomed"))) {
                                s.preventDefault(), l = new Date, o.core.touchAction = "zoomSwipe", t = o.core.getSlideItem(o.core.index).find(".lg-img-wrap").first();
                                var a = o.getDragAllowedAxises(0);
                                r = a.allowY, ((n = a.allowX) || r) && (i = o.getSwipeCords(s)), e = o.getPossibleSwipeDragCords(), 
                                o.core.outer.addClass("lg-zoom-dragging lg-zoom-drag-transition");
                            }
                        })), this.core.$inner.on("touchmove.lg", (function(l) {
                            if (1 === l.touches.length && "zoomSwipe" === o.core.touchAction && (o.$LG(l.target).hasClass("lg-item") || c.get().contains(l.target))) {
                                l.preventDefault(), o.core.touchAction = "zoomSwipe", s = o.getSwipeCords(l);
                                var g = o.getZoomSwipeCords(i, s, n, r, e);
                                (Math.abs(s.x - i.x) > 15 || Math.abs(s.y - i.y) > 15) && (a = !0, o.setZoomSwipeStyles(t, g));
                            }
                        })), this.core.$inner.on("touchend.lg", (function(e) {
                            if ("zoomSwipe" === o.core.touchAction && (o.$LG(e.target).hasClass("lg-item") || c.get().contains(e.target))) {
                                if (e.preventDefault(), o.core.touchAction = void 0, o.core.outer.removeClass("lg-zoom-dragging"), 
                                !a) return;
                                a = !1;
                                var t = (new Date).valueOf() - l.valueOf();
                                o.touchendZoom(i, s, n, r, t);
                            }
                        }));
                    }, h.prototype.zoomDrag = function() {
                        var e, t, o, i, s = this, a = {}, n = {}, r = !1, l = !1, c = !1, g = !1;
                        this.core.outer.on("mousedown.lg.zoom", (function(t) {
                            if (s.isImageSlide(s.core.index)) {
                                var n = s.core.getSlideItem(s.core.index);
                                if (s.$LG(t.target).hasClass("lg-item") || n.get().contains(t.target)) {
                                    e = new Date, i = s.core.getSlideItem(s.core.index).find(".lg-img-wrap").first();
                                    var l = s.getDragAllowedAxises(0);
                                    g = l.allowY, c = l.allowX, s.core.outer.hasClass("lg-zoomed") && s.$LG(t.target).hasClass("lg-object") && (c || g) && (t.preventDefault(), 
                                    a = s.getDragCords(t), o = s.getPossibleSwipeDragCords(), r = !0, s.core.outer.removeClass("lg-grab").addClass("lg-grabbing lg-zoom-drag-transition lg-zoom-dragging"));
                                }
                            }
                        })), this.$LG(window).on("mousemove.lg.zoom.global" + this.core.lgId, (function(e) {
                            if (r) {
                                l = !0, n = s.getDragCords(e);
                                var t = s.getZoomSwipeCords(a, n, c, g, o);
                                s.setZoomSwipeStyles(i, t);
                            }
                        })), this.$LG(window).on("mouseup.lg.zoom.global" + this.core.lgId, (function(o) {
                            if (r) {
                                if (t = new Date, r = !1, s.core.outer.removeClass("lg-zoom-dragging"), l && (a.x !== n.x || a.y !== n.y)) {
                                    n = s.getDragCords(o);
                                    var i = t.valueOf() - e.valueOf();
                                    s.touchendZoom(a, n, c, g, i);
                                }
                                l = !1;
                            }
                            s.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
                        }));
                    }, h.prototype.closeGallery = function() {
                        this.resetZoom();
                    }, h.prototype.destroy = function() {
                        this.$LG(window).off(".lg.zoom.global" + this.core.lgId), this.core.LGel.off(".lg.zoom"), 
                        this.core.LGel.off(".zoom"), clearTimeout(this.zoomableTimeout), this.zoomableTimeout = !1;
                    }, h;
                }();
            }));
        },
        732: function(module) {
            !function(n, t) {
                true ? module.exports = t() : 0;
            }(0, (function() {
                "use strict";
                function n() {
                    return n = Object.assign || function(n) {
                        for (var t = 1; t < arguments.length; t++) {
                            var e = arguments[t];
                            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
                        }
                        return n;
                    }, n.apply(this, arguments);
                }
                var t = "undefined" != typeof window, e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), i = t && "IntersectionObserver" in window, o = t && "classList" in document.createElement("p"), a = t && window.devicePixelRatio > 1, r = {
                    elements_selector: ".lazy",
                    container: e || t ? document : null,
                    threshold: 300,
                    thresholds: null,
                    data_src: "src",
                    data_srcset: "srcset",
                    data_sizes: "sizes",
                    data_bg: "bg",
                    data_bg_hidpi: "bg-hidpi",
                    data_bg_multi: "bg-multi",
                    data_bg_multi_hidpi: "bg-multi-hidpi",
                    data_bg_set: "bg-set",
                    data_poster: "poster",
                    class_applied: "applied",
                    class_loading: "loading",
                    class_loaded: "loaded",
                    class_error: "error",
                    class_entered: "entered",
                    class_exited: "exited",
                    unobserve_completed: !0,
                    unobserve_entered: !1,
                    cancel_on_exit: !0,
                    callback_enter: null,
                    callback_exit: null,
                    callback_applied: null,
                    callback_loading: null,
                    callback_loaded: null,
                    callback_error: null,
                    callback_finish: null,
                    callback_cancel: null,
                    use_native: !1,
                    restore_on_error: !1
                }, c = function(t) {
                    return n({}, r, t);
                }, l = function(n, t) {
                    var e, i = "LazyLoad::Initialized", o = new n(t);
                    try {
                        e = new CustomEvent(i, {
                            detail: {
                                instance: o
                            }
                        });
                    } catch (n) {
                        (e = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
                            instance: o
                        });
                    }
                    window.dispatchEvent(e);
                }, u = "src", s = "srcset", d = "sizes", f = "poster", _ = "llOriginalAttrs", g = "data", v = "loading", b = "loaded", m = "applied", p = "error", h = "native", E = "data-", I = "ll-status", y = function(n, t) {
                    return n.getAttribute(E + t);
                }, k = function(n) {
                    return y(n, I);
                }, w = function(n, t) {
                    return function(n, t, e) {
                        var i = "data-ll-status";
                        null !== e ? n.setAttribute(i, e) : n.removeAttribute(i);
                    }(n, 0, t);
                }, A = function(n) {
                    return w(n, null);
                }, L = function(n) {
                    return null === k(n);
                }, O = function(n) {
                    return k(n) === h;
                }, x = [ v, b, m, p ], C = function(n, t, e, i) {
                    n && (void 0 === i ? void 0 === e ? n(t) : n(t, e) : n(t, e, i));
                }, N = function(n, t) {
                    o ? n.classList.add(t) : n.className += (n.className ? " " : "") + t;
                }, M = function(n, t) {
                    o ? n.classList.remove(t) : n.className = n.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
                }, z = function(n) {
                    return n.llTempImage;
                }, T = function(n, t) {
                    if (t) {
                        var e = t._observer;
                        e && e.unobserve(n);
                    }
                }, R = function(n, t) {
                    n && (n.loadingCount += t);
                }, G = function(n, t) {
                    n && (n.toLoadCount = t);
                }, j = function(n) {
                    for (var t, e = [], i = 0; t = n.children[i]; i += 1) "SOURCE" === t.tagName && e.push(t);
                    return e;
                }, D = function(n, t) {
                    var e = n.parentNode;
                    e && "PICTURE" === e.tagName && j(e).forEach(t);
                }, H = function(n, t) {
                    j(n).forEach(t);
                }, V = [ u ], F = [ u, f ], B = [ u, s, d ], J = [ g ], P = function(n) {
                    return !!n[_];
                }, S = function(n) {
                    return n[_];
                }, U = function(n) {
                    return delete n[_];
                }, $ = function(n, t) {
                    if (!P(n)) {
                        var e = {};
                        t.forEach((function(t) {
                            e[t] = n.getAttribute(t);
                        })), n[_] = e;
                    }
                }, q = function(n, t) {
                    if (P(n)) {
                        var e = S(n);
                        t.forEach((function(t) {
                            !function(n, t, e) {
                                e ? n.setAttribute(t, e) : n.removeAttribute(t);
                            }(n, t, e[t]);
                        }));
                    }
                }, K = function(n, t, e) {
                    N(n, t.class_applied), w(n, m), e && (t.unobserve_completed && T(n, t), C(t.callback_applied, n, e));
                }, Q = function(n, t, e) {
                    N(n, t.class_loading), w(n, v), e && (R(e, 1), C(t.callback_loading, n, e));
                }, W = function(n, t, e) {
                    e && n.setAttribute(t, e);
                }, X = function(n, t) {
                    W(n, d, y(n, t.data_sizes)), W(n, s, y(n, t.data_srcset)), W(n, u, y(n, t.data_src));
                }, Y = {
                    IMG: function(n, t) {
                        D(n, (function(n) {
                            $(n, B), X(n, t);
                        })), $(n, B), X(n, t);
                    },
                    IFRAME: function(n, t) {
                        $(n, V), W(n, u, y(n, t.data_src));
                    },
                    VIDEO: function(n, t) {
                        H(n, (function(n) {
                            $(n, V), W(n, u, y(n, t.data_src));
                        })), $(n, F), W(n, f, y(n, t.data_poster)), W(n, u, y(n, t.data_src)), n.load();
                    },
                    OBJECT: function(n, t) {
                        $(n, J), W(n, g, y(n, t.data_src));
                    }
                }, Z = [ "IMG", "IFRAME", "VIDEO", "OBJECT" ], nn = function(n, t) {
                    !t || function(n) {
                        return n.loadingCount > 0;
                    }(t) || function(n) {
                        return n.toLoadCount > 0;
                    }(t) || C(n.callback_finish, t);
                }, tn = function(n, t, e) {
                    n.addEventListener(t, e), n.llEvLisnrs[t] = e;
                }, en = function(n, t, e) {
                    n.removeEventListener(t, e);
                }, on = function(n) {
                    return !!n.llEvLisnrs;
                }, an = function(n) {
                    if (on(n)) {
                        var t = n.llEvLisnrs;
                        for (var e in t) {
                            var i = t[e];
                            en(n, e, i);
                        }
                        delete n.llEvLisnrs;
                    }
                }, rn = function(n, t, e) {
                    !function(n) {
                        delete n.llTempImage;
                    }(n), R(e, -1), function(n) {
                        n && (n.toLoadCount -= 1);
                    }(e), M(n, t.class_loading), t.unobserve_completed && T(n, e);
                }, cn = function(n, t, e) {
                    var i = z(n) || n;
                    on(i) || function(n, t, e) {
                        on(n) || (n.llEvLisnrs = {});
                        var i = "VIDEO" === n.tagName ? "loadeddata" : "load";
                        tn(n, i, t), tn(n, "error", e);
                    }(i, (function(o) {
                        !function(n, t, e, i) {
                            var o = O(t);
                            rn(t, e, i), N(t, e.class_loaded), w(t, b), C(e.callback_loaded, t, i), o || nn(e, i);
                        }(0, n, t, e), an(i);
                    }), (function(o) {
                        !function(n, t, e, i) {
                            var o = O(t);
                            rn(t, e, i), N(t, e.class_error), w(t, p), C(e.callback_error, t, i), e.restore_on_error && q(t, B), 
                            o || nn(e, i);
                        }(0, n, t, e), an(i);
                    }));
                }, ln = function(n, t, e) {
                    !function(n) {
                        return Z.indexOf(n.tagName) > -1;
                    }(n) ? function(n, t, e) {
                        !function(n) {
                            n.llTempImage = document.createElement("IMG");
                        }(n), cn(n, t, e), function(n) {
                            P(n) || (n[_] = {
                                backgroundImage: n.style.backgroundImage
                            });
                        }(n), function(n, t, e) {
                            var i = y(n, t.data_bg), o = y(n, t.data_bg_hidpi), r = a && o ? o : i;
                            r && (n.style.backgroundImage = 'url("'.concat(r, '")'), z(n).setAttribute(u, r), 
                            Q(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var i = y(n, t.data_bg_multi), o = y(n, t.data_bg_multi_hidpi), r = a && o ? o : i;
                            r && (n.style.backgroundImage = r, K(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var i = y(n, t.data_bg_set);
                            if (i) {
                                var o = i.split("|"), a = o.map((function(n) {
                                    return "image-set(".concat(n, ")");
                                }));
                                n.style.backgroundImage = a.join(), "" === n.style.backgroundImage && (a = o.map((function(n) {
                                    return "-webkit-image-set(".concat(n, ")");
                                })), n.style.backgroundImage = a.join()), K(n, t, e);
                            }
                        }(n, t, e);
                    }(n, t, e) : function(n, t, e) {
                        cn(n, t, e), function(n, t, e) {
                            var i = Y[n.tagName];
                            i && (i(n, t), Q(n, t, e));
                        }(n, t, e);
                    }(n, t, e);
                }, un = function(n) {
                    n.removeAttribute(u), n.removeAttribute(s), n.removeAttribute(d);
                }, sn = function(n) {
                    D(n, (function(n) {
                        q(n, B);
                    })), q(n, B);
                }, dn = {
                    IMG: sn,
                    IFRAME: function(n) {
                        q(n, V);
                    },
                    VIDEO: function(n) {
                        H(n, (function(n) {
                            q(n, V);
                        })), q(n, F), n.load();
                    },
                    OBJECT: function(n) {
                        q(n, J);
                    }
                }, fn = function(n, t) {
                    (function(n) {
                        var t = dn[n.tagName];
                        t ? t(n) : function(n) {
                            if (P(n)) {
                                var t = S(n);
                                n.style.backgroundImage = t.backgroundImage;
                            }
                        }(n);
                    })(n), function(n, t) {
                        L(n) || O(n) || (M(n, t.class_entered), M(n, t.class_exited), M(n, t.class_applied), 
                        M(n, t.class_loading), M(n, t.class_loaded), M(n, t.class_error));
                    }(n, t), A(n), U(n);
                }, _n = [ "IMG", "IFRAME", "VIDEO" ], gn = function(n) {
                    return n.use_native && "loading" in HTMLImageElement.prototype;
                }, vn = function(n, t, e) {
                    n.forEach((function(n) {
                        return function(n) {
                            return n.isIntersecting || n.intersectionRatio > 0;
                        }(n) ? function(n, t, e, i) {
                            var o = function(n) {
                                return x.indexOf(k(n)) >= 0;
                            }(n);
                            w(n, "entered"), N(n, e.class_entered), M(n, e.class_exited), function(n, t, e) {
                                t.unobserve_entered && T(n, e);
                            }(n, e, i), C(e.callback_enter, n, t, i), o || ln(n, e, i);
                        }(n.target, n, t, e) : function(n, t, e, i) {
                            L(n) || (N(n, e.class_exited), function(n, t, e, i) {
                                e.cancel_on_exit && function(n) {
                                    return k(n) === v;
                                }(n) && "IMG" === n.tagName && (an(n), function(n) {
                                    D(n, (function(n) {
                                        un(n);
                                    })), un(n);
                                }(n), sn(n), M(n, e.class_loading), R(i, -1), A(n), C(e.callback_cancel, n, t, i));
                            }(n, t, e, i), C(e.callback_exit, n, t, i));
                        }(n.target, n, t, e);
                    }));
                }, bn = function(n) {
                    return Array.prototype.slice.call(n);
                }, mn = function(n) {
                    return n.container.querySelectorAll(n.elements_selector);
                }, pn = function(n) {
                    return function(n) {
                        return k(n) === p;
                    }(n);
                }, hn = function(n, t) {
                    return function(n) {
                        return bn(n).filter(L);
                    }(n || mn(t));
                }, En = function(n, e) {
                    var o = c(n);
                    this._settings = o, this.loadingCount = 0, function(n, t) {
                        i && !gn(n) && (t._observer = new IntersectionObserver((function(e) {
                            vn(e, n, t);
                        }), function(n) {
                            return {
                                root: n.container === document ? null : n.container,
                                rootMargin: n.thresholds || n.threshold + "px"
                            };
                        }(n)));
                    }(o, this), function(n, e) {
                        t && (e._onlineHandler = function() {
                            !function(n, t) {
                                var e;
                                (e = mn(n), bn(e).filter(pn)).forEach((function(t) {
                                    M(t, n.class_error), A(t);
                                })), t.update();
                            }(n, e);
                        }, window.addEventListener("online", e._onlineHandler));
                    }(o, this), this.update(e);
                };
                return En.prototype = {
                    update: function(n) {
                        var t, o, a = this._settings, r = hn(n, a);
                        G(this, r.length), !e && i ? gn(a) ? function(n, t, e) {
                            n.forEach((function(n) {
                                -1 !== _n.indexOf(n.tagName) && function(n, t, e) {
                                    n.setAttribute("loading", "lazy"), cn(n, t, e), function(n, t) {
                                        var e = Y[n.tagName];
                                        e && e(n, t);
                                    }(n, t), w(n, h);
                                }(n, t, e);
                            })), G(e, 0);
                        }(r, a, this) : (o = r, function(n) {
                            n.disconnect();
                        }(t = this._observer), function(n, t) {
                            t.forEach((function(t) {
                                n.observe(t);
                            }));
                        }(t, o)) : this.loadAll(r);
                    },
                    destroy: function() {
                        this._observer && this._observer.disconnect(), t && window.removeEventListener("online", this._onlineHandler), 
                        mn(this._settings).forEach((function(n) {
                            U(n);
                        })), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, 
                        delete this.toLoadCount;
                    },
                    loadAll: function(n) {
                        var t = this, e = this._settings;
                        hn(n, e).forEach((function(n) {
                            T(n, t), ln(n, e, t);
                        }));
                    },
                    restoreAll: function() {
                        var n = this._settings;
                        mn(n).forEach((function(t) {
                            fn(t, n);
                        }));
                    }
                }, En.load = function(n, t) {
                    var e = c(t);
                    ln(n, e);
                }, En.resetStatus = function(n) {
                    A(n);
                }, t && function(n, t) {
                    if (t) if (t.length) for (var e, i = 0; e = t[i]; i += 1) l(n, e); else l(n, t);
                }(En, window.lazyLoadOptions), En;
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        __webpack_require__.n = module => {
            var getter = module && module.__esModule ? () => module["default"] : () => module;
            __webpack_require__.d(getter, {
                a: getter
            });
            return getter;
        };
    })();
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
                enumerable: true,
                get: definition[key]
            });
        };
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
        "use strict";
        const flsModules = {};
        let isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
            }
        };
        function addTouchClass() {
            if (isMobile.any()) document.documentElement.classList.add("touch");
        }
        function functions_getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        function setHash(hash) {
            hash = hash ? `#${hash}` : window.location.href.split("#")[0];
            history.pushState("", "", hash);
        }
        function fullVHfix() {
            const fullScreens = document.querySelectorAll("[data-fullscreen]");
            if (fullScreens.length && isMobile.any()) {
                window.addEventListener("resize", fixHeight);
                function fixHeight() {
                    let vh = .01 * window.innerHeight;
                    document.documentElement.style.setProperty("--vh", `${vh}px`);
                }
                fixHeight();
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function spollers() {
            const spollersArray = document.querySelectorAll("[data-spollers]");
            if (spollersArray.length > 0) {
                const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                    return !item.dataset.spollers.split(",")[0];
                }));
                if (spollersRegular.length) initSpollers(spollersRegular);
                let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                function initSpollers(spollersArray, matchMedia = false) {
                    spollersArray.forEach((spollersBlock => {
                        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                        if (matchMedia.matches || !matchMedia) {
                            spollersBlock.classList.add("_spoller-init");
                            initSpollerBody(spollersBlock);
                            spollersBlock.addEventListener("click", setSpollerAction);
                        } else {
                            spollersBlock.classList.remove("_spoller-init");
                            initSpollerBody(spollersBlock, false);
                            spollersBlock.removeEventListener("click", setSpollerAction);
                        }
                    }));
                }
                function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                    let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                    if (spollerTitles.length) {
                        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                        spollerTitles.forEach((spollerTitle => {
                            if (hideSpollerBody) {
                                spollerTitle.removeAttribute("tabindex");
                                if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                            } else {
                                spollerTitle.setAttribute("tabindex", "-1");
                                spollerTitle.nextElementSibling.hidden = false;
                            }
                        }));
                    }
                }
                function setSpollerAction(e) {
                    const el = e.target;
                    if (el.closest("[data-spoller]")) {
                        const spollerTitle = el.closest("[data-spoller]");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                        }
                        e.preventDefault();
                    }
                }
                function hideSpollersBody(spollersBlock) {
                    const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                        spollerActiveTitle.classList.remove("_spoller-active");
                        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    }
                }
                const spollersClose = document.querySelectorAll("[data-spoller-close]");
                if (spollersClose.length) document.addEventListener("click", (function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        spollerClose.classList.remove("_spoller-active");
                        _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                    }));
                }));
            }
        }
        function tabs() {
            const tabs = document.querySelectorAll("[data-tabs]");
            let tabsActiveHash = [];
            if (tabs.length > 0) {
                const hash = functions_getHash();
                if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
                tabs.forEach(((tabsBlock, index) => {
                    tabsBlock.classList.add("_tab-init");
                    tabsBlock.setAttribute("data-tabs-index", index);
                    tabsBlock.addEventListener("click", setTabsAction);
                    initTabs(tabsBlock);
                }));
                let mdQueriesArray = dataMediaQueries(tabs, "tabs");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
            }
            function setTitlePosition(tabsMediaArray, matchMedia) {
                tabsMediaArray.forEach((tabsMediaItem => {
                    tabsMediaItem = tabsMediaItem.item;
                    let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                    let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                    let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                    let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                    tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems.forEach(((tabsContentItem, index) => {
                        if (matchMedia.matches) {
                            tabsContent.append(tabsTitleItems[index]);
                            tabsContent.append(tabsContentItem);
                            tabsMediaItem.classList.add("_tab-spoller");
                        } else {
                            tabsTitles.append(tabsTitleItems[index]);
                            tabsMediaItem.classList.remove("_tab-spoller");
                        }
                    }));
                }));
            }
            function initTabs(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
                if (tabsActiveHashBlock) {
                    const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                    tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
                }
                if (tabsContent.length) {
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        tabsTitles[index].setAttribute("data-tabs-title", "");
                        tabsContentItem.setAttribute("data-tabs-item", "");
                        if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                        tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                    }));
                }
            }
            function setTabsStatus(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                function isTabsAnamate(tabsBlock) {
                    if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
                }
                const tabsBlockAnimate = isTabsAnamate(tabsBlock);
                if (tabsContent.length > 0) {
                    const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        if (tabsTitles[index].classList.contains("_tab-active")) {
                            if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                            if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                        } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                    }));
                }
            }
            function setTabsAction(e) {
                const el = e.target;
                if (el.closest("[data-tabs-title]")) {
                    const tabTitle = el.closest("[data-tabs-title]");
                    const tabsBlock = tabTitle.closest("[data-tabs]");
                    if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                        let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                        tabTitle.classList.add("_tab-active");
                        setTabsStatus(tabsBlock);
                    }
                    e.preventDefault();
                }
            }
        }
        function menuInit() {
            if (document.querySelector(".icon-menu") || document.querySelector(".header-index-menu-icon")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu") || e.target.closest(".header-index-menu-icon")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function showMore() {
            window.addEventListener("load", (function(e) {
                const showMoreBlocks = document.querySelectorAll("[data-showmore]");
                let showMoreBlocksRegular;
                let mdQueriesArray;
                if (showMoreBlocks.length) {
                    showMoreBlocksRegular = Array.from(showMoreBlocks).filter((function(item, index, self) {
                        return !item.dataset.showmoreMedia;
                    }));
                    showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
                    document.addEventListener("click", showMoreActions);
                    window.addEventListener("resize", showMoreActions);
                    mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
                    if (mdQueriesArray && mdQueriesArray.length) {
                        mdQueriesArray.forEach((mdQueriesItem => {
                            mdQueriesItem.matchMedia.addEventListener("change", (function() {
                                initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                            }));
                        }));
                        initItemsMedia(mdQueriesArray);
                    }
                }
                function initItemsMedia(mdQueriesArray) {
                    mdQueriesArray.forEach((mdQueriesItem => {
                        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                }
                function initItems(showMoreBlocks, matchMedia) {
                    showMoreBlocks.forEach((showMoreBlock => {
                        initItem(showMoreBlock, matchMedia);
                    }));
                }
                function initItem(showMoreBlock, matchMedia = false) {
                    showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
                    let showMoreContent = showMoreBlock.querySelectorAll("[data-showmore-content]");
                    let showMoreButton = showMoreBlock.querySelectorAll("[data-showmore-button]");
                    showMoreContent = Array.from(showMoreContent).filter((item => item.closest("[data-showmore]") === showMoreBlock))[0];
                    showMoreButton = Array.from(showMoreButton).filter((item => item.closest("[data-showmore]") === showMoreBlock))[0];
                    const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
                    if (matchMedia.matches || !matchMedia) if (hiddenHeight < getOriginalHeight(showMoreContent)) {
                        _slideUp(showMoreContent, 0, hiddenHeight);
                        showMoreButton.hidden = false;
                    } else {
                        _slideDown(showMoreContent, 0, hiddenHeight);
                        showMoreButton.hidden = true;
                    } else {
                        _slideDown(showMoreContent, 0, hiddenHeight);
                        showMoreButton.hidden = true;
                    }
                }
                function getHeight(showMoreBlock, showMoreContent) {
                    let hiddenHeight = 0;
                    const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : "size";
                    if ("items" === showMoreType) {
                        const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
                        const showMoreItems = showMoreContent.children;
                        for (let index = 1; index < showMoreItems.length; index++) {
                            const showMoreItem = showMoreItems[index - 1];
                            hiddenHeight += showMoreItem.offsetHeight;
                            if (index == showMoreTypeValue) break;
                        }
                    } else {
                        const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
                        hiddenHeight = showMoreTypeValue;
                    }
                    return hiddenHeight;
                }
                function getOriginalHeight(showMoreContent) {
                    let parentHidden;
                    let hiddenHeight = showMoreContent.offsetHeight;
                    showMoreContent.style.removeProperty("height");
                    if (showMoreContent.closest(`[hidden]`)) {
                        parentHidden = showMoreContent.closest(`[hidden]`);
                        parentHidden.hidden = false;
                    }
                    let originalHeight = showMoreContent.offsetHeight;
                    parentHidden ? parentHidden.hidden = true : null;
                    showMoreContent.style.height = `${hiddenHeight}px`;
                    return originalHeight;
                }
                function showMoreActions(e) {
                    const targetEvent = e.target;
                    const targetType = e.type;
                    if ("click" === targetType) {
                        if (targetEvent.closest("[data-showmore-button]")) {
                            const showMoreButton = targetEvent.closest("[data-showmore-button]");
                            const showMoreBlock = showMoreButton.closest("[data-showmore]");
                            const showMoreContent = showMoreBlock.querySelector("[data-showmore-content]");
                            const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : "500";
                            const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
                            if (!showMoreContent.classList.contains("_slide")) {
                                showMoreBlock.classList.contains("_showmore-active") ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
                                showMoreBlock.classList.toggle("_showmore-active");
                            }
                        }
                    } else if ("resize" === targetType) {
                        showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
                        mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
                    }
                }
            }));
        }
        function FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function removeClasses(array, className) {
            for (var i = 0; i < array.length; i++) array[i].classList.remove(className);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        class Popup {
            constructor(options) {
                let config = {
                    logging: true,
                    init: true,
                    attributeOpenButton: "data-popup",
                    attributeCloseButton: "data-close",
                    fixElementSelector: "[data-lp]",
                    youtubeAttribute: "data-popup-youtube",
                    youtubePlaceAttribute: "data-popup-youtube-place",
                    setAutoplayYoutube: true,
                    classes: {
                        popup: "popup",
                        popupContent: "popup__content",
                        popupActive: "popup_show",
                        bodyActive: "popup-show"
                    },
                    focusCatch: true,
                    closeEsc: true,
                    bodyLock: true,
                    hashSettings: {
                        location: false,
                        goHash: false
                    },
                    on: {
                        beforeOpen: function() {},
                        afterOpen: function() {},
                        beforeClose: function() {},
                        afterClose: function() {}
                    }
                };
                this.youTubeCode;
                this.isOpen = false;
                this.targetOpen = {
                    selector: false,
                    element: false
                };
                this.previousOpen = {
                    selector: false,
                    element: false
                };
                this.lastClosed = {
                    selector: false,
                    element: false
                };
                this._dataValue = false;
                this.hash = false;
                this._reopen = false;
                this._selectorOpen = false;
                this.lastFocusEl = false;
                this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
                this.options = {
                    ...config,
                    ...options,
                    classes: {
                        ...config.classes,
                        ...options?.classes
                    },
                    hashSettings: {
                        ...config.hashSettings,
                        ...options?.hashSettings
                    },
                    on: {
                        ...config.on,
                        ...options?.on
                    }
                };
                this.bodyLock = false;
                this.options.init ? this.initPopups() : null;
            }
            initPopups() {
                this.popupLogging(`Проснулся`);
                this.eventsPopup();
            }
            eventsPopup() {
                document.addEventListener("click", function(e) {
                    const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                    if (buttonOpen) {
                        e.preventDefault();
                        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                        if ("error" !== this._dataValue) {
                            if (!this.isOpen) this.lastFocusEl = buttonOpen;
                            this.targetOpen.selector = `${this._dataValue}`;
                            this._selectorOpen = true;
                            this.open();
                            return;
                        } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                        return;
                    }
                    const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                    if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                }.bind(this));
                document.addEventListener("keydown", function(e) {
                    if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                    if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                        this._focusCatch(e);
                        return;
                    }
                }.bind(this));
                if (this.options.hashSettings.goHash) {
                    window.addEventListener("hashchange", function() {
                        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                    }.bind(this));
                    window.addEventListener("load", function() {
                        if (window.location.hash) this._openToHash();
                    }.bind(this));
                }
            }
            open(selectorValue) {
                if (bodyLockStatus) {
                    this.bodyLock = document.documentElement.classList.contains("lock") ? true : false;
                    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                        this.targetOpen.selector = selectorValue;
                        this._selectorOpen = true;
                    }
                    if (this.isOpen) {
                        this._reopen = true;
                        this.close();
                    }
                    if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                    if (!this._reopen) this.previousActiveElement = document.activeElement;
                    this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                    if (this.targetOpen.element) {
                        if (this.youTubeCode) {
                            const codeVideo = this.youTubeCode;
                            const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                            const iframe = document.createElement("iframe");
                            iframe.setAttribute("allowfullscreen", "");
                            const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                            iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                            iframe.setAttribute("src", urlVideo);
                            if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                                this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                            }
                            this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                        }
                        if (this.options.hashSettings.location) {
                            this._getHash();
                            this._setHash();
                        }
                        this.options.on.beforeOpen(this);
                        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.targetOpen.element.classList.add(this.options.classes.popupActive);
                        document.documentElement.classList.add(this.options.classes.bodyActive);
                        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                        this.targetOpen.element.setAttribute("aria-hidden", "false");
                        this.previousOpen.selector = this.targetOpen.selector;
                        this.previousOpen.element = this.targetOpen.element;
                        this._selectorOpen = false;
                        this.isOpen = true;
                        setTimeout((() => {
                            this._focusTrap();
                        }), 50);
                        this.options.on.afterOpen(this);
                        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.popupLogging(`Открыл попап`);
                    } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
                }
            }
            close(selectorValue) {
                if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
                if (!this.isOpen || !bodyLockStatus) return;
                this.options.on.beforeClose(this);
                document.dispatchEvent(new CustomEvent("beforePopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
                this.previousOpen.element.classList.remove(this.options.classes.popupActive);
                this.previousOpen.element.setAttribute("aria-hidden", "true");
                if (!this._reopen) {
                    document.documentElement.classList.remove(this.options.classes.bodyActive);
                    !this.bodyLock ? bodyUnlock() : null;
                    this.isOpen = false;
                }
                this._removeHash();
                if (this._selectorOpen) {
                    this.lastClosed.selector = this.previousOpen.selector;
                    this.lastClosed.element = this.previousOpen.element;
                }
                this.options.on.afterClose(this);
                document.dispatchEvent(new CustomEvent("afterPopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                setTimeout((() => {
                    this._focusTrap();
                }), 50);
                this.popupLogging(`Закрыл попап`);
            }
            _getHash() {
                if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
            }
            _openToHash() {
                let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
                const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
                if (buttons && classInHash) this.open(classInHash);
            }
            _setHash() {
                history.pushState("", "", this.hash);
            }
            _removeHash() {
                history.pushState("", "", window.location.href.split("#")[0]);
            }
            _focusCatch(e) {
                const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
                const focusArray = Array.prototype.slice.call(focusable);
                const focusedIndex = focusArray.indexOf(document.activeElement);
                if (e.shiftKey && 0 === focusedIndex) {
                    focusArray[focusArray.length - 1].focus();
                    e.preventDefault();
                }
                if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                    focusArray[0].focus();
                    e.preventDefault();
                }
            }
            _focusTrap() {
                const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
                if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
            }
            popupLogging(message) {
                this.options.logging ? FLS(`[Попапос]: ${message}`) : null;
            }
        }
        flsModules.popup = new Popup({});
        let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    headerItemHeight = document.querySelector(headerItem).offsetHeight;
                }
                let options = {
                    speedAsDuration: true,
                    speed,
                    header: headerItem,
                    offset: offsetTop,
                    easing: "easeOutQuad"
                };
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                    window.scrollTo({
                        top: targetBlockElementPosition,
                        behavior: "smooth"
                    });
                }
                FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
            } else FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
        };
        function formFieldsInit(options = {
            viewPass: false
        }) {
            const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
            if (formFields.length) formFields.forEach((formField => {
                if (!formField.hasAttribute("data-placeholder-nohide")) formField.dataset.placeholder = formField.placeholder;
            }));
            document.body.addEventListener("focusin", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.add("_form-focus");
                        targetElement.parentElement.classList.add("_form-focus");
                    }
                    formValidate.removeError(targetElement);
                }
            }));
            document.body.addEventListener("focusout", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = targetElement.dataset.placeholder;
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.remove("_form-focus");
                        targetElement.parentElement.classList.remove("_form-focus");
                    }
                    if (targetElement.hasAttribute("data-validate")) formValidate.validateInput(targetElement);
                }
            }));
            if (options.viewPass) document.addEventListener("click", (function(e) {
                let targetElement = e.target;
                if (targetElement.closest('[class*="__viewpass"]')) {
                    let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                    targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                    targetElement.classList.toggle("_viewpass-active");
                }
            }));
        }
        let formValidate = {
            getErrors(form) {
                let error = 0;
                let formRequiredItems = form.querySelectorAll("*[data-required]");
                if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                    if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
                }));
                return error;
            },
            validateInput(formRequiredItem) {
                let error = 0;
                if ("email" === formRequiredItem.dataset.required) {
                    formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                    if (this.emailTest(formRequiredItem)) {
                        this.addError(formRequiredItem);
                        error++;
                    } else this.removeError(formRequiredItem);
                } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                    this.addError(formRequiredItem);
                    error++;
                } else if (!formRequiredItem.value) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
                return error;
            },
            addError(formRequiredItem) {
                formRequiredItem.classList.add("_form-error");
                formRequiredItem.parentElement.classList.add("_form-error");
                let inputError = formRequiredItem.parentElement.querySelector(".form__error");
                if (inputError) formRequiredItem.parentElement.removeChild(inputError);
                if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            },
            removeError(formRequiredItem) {
                formRequiredItem.classList.remove("_form-error");
                formRequiredItem.parentElement.classList.remove("_form-error");
                if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
            },
            formClean(form) {
                form.reset();
                setTimeout((() => {
                    let inputs = form.querySelectorAll("input,textarea");
                    for (let index = 0; index < inputs.length; index++) {
                        const el = inputs[index];
                        el.parentElement.classList.remove("_form-focus");
                        el.classList.remove("_form-focus");
                        formValidate.removeError(el);
                    }
                    let checkboxes = form.querySelectorAll(".checkbox__input");
                    if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                        const checkbox = checkboxes[index];
                        checkbox.checked = false;
                    }
                    if (flsModules.select) {
                        let selects = form.querySelectorAll(".select");
                        if (selects.length) for (let index = 0; index < selects.length; index++) {
                            const select = selects[index].querySelector("select");
                            flsModules.select.selectBuild(select);
                        }
                    }
                }), 0);
            },
            emailTest(formRequiredItem) {
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
            }
        };
        function formSubmit(options = {
            validate: true
        }) {
            const forms = document.forms;
            if (forms.length) for (const form of forms) {
                form.addEventListener("submit", (function(e) {
                    const form = e.target;
                    formSubmitAction(form, e);
                }));
                form.addEventListener("reset", (function(e) {
                    const form = e.target;
                    formValidate.formClean(form);
                }));
            }
            async function formSubmitAction(form, e) {
                const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
                if (0 === error) {
                    const ajax = form.hasAttribute("data-ajax");
                    if (ajax) {
                        e.preventDefault();
                        const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
                        const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
                        const formData = new FormData(form);
                        form.classList.add("_sending");
                        const response = await fetch(formAction, {
                            method: formMethod,
                            body: formData
                        });
                        if (response.ok) {
                            await response.json();
                            form.classList.remove("_sending");
                            formSent(form);
                        } else {
                            alert("Ошибка");
                            form.classList.remove("_sending");
                        }
                    } else if (form.hasAttribute("data-dev")) {
                        e.preventDefault();
                        formSent(form);
                    }
                } else {
                    e.preventDefault();
                    const formError = form.querySelector("._form-error");
                    if (formError && form.hasAttribute("data-goto-error")) gotoblock_gotoBlock(formError, true, 1e3);
                }
            }
            function formSent(form) {
                document.dispatchEvent(new CustomEvent("formSent", {
                    detail: {
                        form
                    }
                }));
                setTimeout((() => {
                    if (flsModules.popup) {
                        const popup = form.dataset.popupMessage;
                        popup ? flsModules.popup.open(popup) : null;
                    }
                }), 0);
                formValidate.formClean(form);
                formLogging(`Форма отправлена!`);
            }
            function formLogging(message) {
                FLS(`[Формы]: ${message}`);
            }
        }
        function isObject(obj) {
            return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
        }
        function extend(target = {}, src = {}) {
            Object.keys(src).forEach((key => {
                if ("undefined" === typeof target[key]) target[key] = src[key]; else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
            }));
        }
        const ssrDocument = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: {
                blur() {},
                nodeName: ""
            },
            querySelector() {
                return null;
            },
            querySelectorAll() {
                return [];
            },
            getElementById() {
                return null;
            },
            createEvent() {
                return {
                    initEvent() {}
                };
            },
            createElement() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute() {},
                    getElementsByTagName() {
                        return [];
                    }
                };
            },
            createElementNS() {
                return {};
            },
            importNode() {
                return null;
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };
        function ssr_window_esm_getDocument() {
            const doc = "undefined" !== typeof document ? document : {};
            extend(doc, ssrDocument);
            return doc;
        }
        const ssrWindow = {
            document: ssrDocument,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState() {},
                pushState() {},
                go() {},
                back() {}
            },
            CustomEvent: function CustomEvent() {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle() {
                return {
                    getPropertyValue() {
                        return "";
                    }
                };
            },
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia() {
                return {};
            },
            requestAnimationFrame(callback) {
                if ("undefined" === typeof setTimeout) {
                    callback();
                    return null;
                }
                return setTimeout(callback, 0);
            },
            cancelAnimationFrame(id) {
                if ("undefined" === typeof setTimeout) return;
                clearTimeout(id);
            }
        };
        function ssr_window_esm_getWindow() {
            const win = "undefined" !== typeof window ? window : {};
            extend(win, ssrWindow);
            return win;
        }
        function makeReactive(obj) {
            const proto = obj.__proto__;
            Object.defineProperty(obj, "__proto__", {
                get() {
                    return proto;
                },
                set(value) {
                    proto.__proto__ = value;
                }
            });
        }
        class Dom7 extends Array {
            constructor(items) {
                if ("number" === typeof items) super(items); else {
                    super(...items || []);
                    makeReactive(this);
                }
            }
        }
        function arrayFlat(arr = []) {
            const res = [];
            arr.forEach((el => {
                if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
            }));
            return res;
        }
        function arrayFilter(arr, callback) {
            return Array.prototype.filter.call(arr, callback);
        }
        function arrayUnique(arr) {
            const uniqueArray = [];
            for (let i = 0; i < arr.length; i += 1) if (-1 === uniqueArray.indexOf(arr[i])) uniqueArray.push(arr[i]);
            return uniqueArray;
        }
        function qsa(selector, context) {
            if ("string" !== typeof selector) return [ selector ];
            const a = [];
            const res = context.querySelectorAll(selector);
            for (let i = 0; i < res.length; i += 1) a.push(res[i]);
            return a;
        }
        function dom7_esm_$(selector, context) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            let arr = [];
            if (!context && selector instanceof Dom7) return selector;
            if (!selector) return new Dom7(arr);
            if ("string" === typeof selector) {
                const html = selector.trim();
                if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                    let toCreate = "div";
                    if (0 === html.indexOf("<li")) toCreate = "ul";
                    if (0 === html.indexOf("<tr")) toCreate = "tbody";
                    if (0 === html.indexOf("<td") || 0 === html.indexOf("<th")) toCreate = "tr";
                    if (0 === html.indexOf("<tbody")) toCreate = "table";
                    if (0 === html.indexOf("<option")) toCreate = "select";
                    const tempParent = document.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
                } else arr = qsa(selector.trim(), context || document);
            } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
                if (selector instanceof Dom7) return selector;
                arr = selector;
            }
            return new Dom7(arrayUnique(arr));
        }
        dom7_esm_$.fn = Dom7.prototype;
        function addClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.add(...classNames);
            }));
            return this;
        }
        function removeClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.remove(...classNames);
            }));
            return this;
        }
        function toggleClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                classNames.forEach((className => {
                    el.classList.toggle(className);
                }));
            }));
        }
        function hasClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
        }
        function attr(attrs, value) {
            if (1 === arguments.length && "string" === typeof attrs) {
                if (this[0]) return this[0].getAttribute(attrs);
                return;
            }
            for (let i = 0; i < this.length; i += 1) if (2 === arguments.length) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
                this[i][attrName] = attrs[attrName];
                this[i].setAttribute(attrName, attrs[attrName]);
            }
            return this;
        }
        function removeAttr(attr) {
            for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
            return this;
        }
        function transform(transform) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
            return this;
        }
        function transition(duration) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = "string" !== typeof duration ? `${duration}ms` : duration;
            return this;
        }
        function on(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            function handleLiveEvent(e) {
                const target = e.target;
                if (!target) return;
                const eventData = e.target.dom7EventData || [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
                    const parents = dom7_esm_$(target).parents();
                    for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
                }
            }
            function handleEvent(e) {
                const eventData = e && e.target ? e.target.dom7EventData || [] : [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                listener.apply(this, eventData);
            }
            const events = eventType.split(" ");
            let j;
            for (let i = 0; i < this.length; i += 1) {
                const el = this[i];
                if (!targetSelector) for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7Listeners) el.dom7Listeners = {};
                    if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
                    el.dom7Listeners[event].push({
                        listener,
                        proxyListener: handleEvent
                    });
                    el.addEventListener(event, handleEvent, capture);
                } else for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
                    if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
                    el.dom7LiveListeners[event].push({
                        listener,
                        proxyListener: handleLiveEvent
                    });
                    el.addEventListener(event, handleLiveEvent, capture);
                }
            }
            return this;
        }
        function off(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            const events = eventType.split(" ");
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    let handlers;
                    if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
                    if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
                        const handler = handlers[k];
                        if (listener && handler.listener === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (!listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        }
                    }
                }
            }
            return this;
        }
        function trigger(...args) {
            const window = ssr_window_esm_getWindow();
            const events = args[0].split(" ");
            const eventData = args[1];
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    if (window.CustomEvent) {
                        const evt = new window.CustomEvent(event, {
                            detail: eventData,
                            bubbles: true,
                            cancelable: true
                        });
                        el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
                        el.dispatchEvent(evt);
                        el.dom7EventData = [];
                        delete el.dom7EventData;
                    }
                }
            }
            return this;
        }
        function transitionEnd(callback) {
            const dom = this;
            function fireCallBack(e) {
                if (e.target !== this) return;
                callback.call(this, e);
                dom.off("transitionend", fireCallBack);
            }
            if (callback) dom.on("transitionend", fireCallBack);
            return this;
        }
        function dom7_esm_outerWidth(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        }
        function dom7_esm_outerHeight(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        }
        function offset() {
            if (this.length > 0) {
                const window = ssr_window_esm_getWindow();
                const document = ssr_window_esm_getDocument();
                const el = this[0];
                const box = el.getBoundingClientRect();
                const body = document.body;
                const clientTop = el.clientTop || body.clientTop || 0;
                const clientLeft = el.clientLeft || body.clientLeft || 0;
                const scrollTop = el === window ? window.scrollY : el.scrollTop;
                const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
                return {
                    top: box.top + scrollTop - clientTop,
                    left: box.left + scrollLeft - clientLeft
                };
            }
            return null;
        }
        function styles() {
            const window = ssr_window_esm_getWindow();
            if (this[0]) return window.getComputedStyle(this[0], null);
            return {};
        }
        function css(props, value) {
            const window = ssr_window_esm_getWindow();
            let i;
            if (1 === arguments.length) if ("string" === typeof props) {
                if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
            } else {
                for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
                return this;
            }
            if (2 === arguments.length && "string" === typeof props) {
                for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
                return this;
            }
            return this;
        }
        function each(callback) {
            if (!callback) return this;
            this.forEach(((el, index) => {
                callback.apply(el, [ el, index ]);
            }));
            return this;
        }
        function filter(callback) {
            const result = arrayFilter(this, callback);
            return dom7_esm_$(result);
        }
        function html(html) {
            if ("undefined" === typeof html) return this[0] ? this[0].innerHTML : null;
            for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
            return this;
        }
        function dom7_esm_text(text) {
            if ("undefined" === typeof text) return this[0] ? this[0].textContent.trim() : null;
            for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
            return this;
        }
        function is(selector) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            const el = this[0];
            let compareWith;
            let i;
            if (!el || "undefined" === typeof selector) return false;
            if ("string" === typeof selector) {
                if (el.matches) return el.matches(selector);
                if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                compareWith = dom7_esm_$(selector);
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            if (selector === document) return el === document;
            if (selector === window) return el === window;
            if (selector.nodeType || selector instanceof Dom7) {
                compareWith = selector.nodeType ? [ selector ] : selector;
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            return false;
        }
        function index() {
            let child = this[0];
            let i;
            if (child) {
                i = 0;
                while (null !== (child = child.previousSibling)) if (1 === child.nodeType) i += 1;
                return i;
            }
            return;
        }
        function eq(index) {
            if ("undefined" === typeof index) return this;
            const length = this.length;
            if (index > length - 1) return dom7_esm_$([]);
            if (index < 0) {
                const returnIndex = length + index;
                if (returnIndex < 0) return dom7_esm_$([]);
                return dom7_esm_$([ this[returnIndex] ]);
            }
            return dom7_esm_$([ this[index] ]);
        }
        function append(...els) {
            let newChild;
            const document = ssr_window_esm_getDocument();
            for (let k = 0; k < els.length; k += 1) {
                newChild = els[k];
                for (let i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
                } else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
            }
            return this;
        }
        function prepend(newChild) {
            const document = ssr_window_esm_getDocument();
            let i;
            let j;
            for (i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = newChild;
                for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
            } else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
            return this;
        }
        function next(selector) {
            if (this.length > 0) {
                if (selector) {
                    if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([ this[0].nextElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (this[0].nextElementSibling) return dom7_esm_$([ this[0].nextElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function nextAll(selector) {
            const nextEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.nextElementSibling) {
                const next = el.nextElementSibling;
                if (selector) {
                    if (dom7_esm_$(next).is(selector)) nextEls.push(next);
                } else nextEls.push(next);
                el = next;
            }
            return dom7_esm_$(nextEls);
        }
        function prev(selector) {
            if (this.length > 0) {
                const el = this[0];
                if (selector) {
                    if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([ el.previousElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (el.previousElementSibling) return dom7_esm_$([ el.previousElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function prevAll(selector) {
            const prevEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.previousElementSibling) {
                const prev = el.previousElementSibling;
                if (selector) {
                    if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
                } else prevEls.push(prev);
                el = prev;
            }
            return dom7_esm_$(prevEls);
        }
        function dom7_esm_parent(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) if (null !== this[i].parentNode) if (selector) {
                if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
            } else parents.push(this[i].parentNode);
            return dom7_esm_$(parents);
        }
        function parents(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) {
                let parent = this[i].parentNode;
                while (parent) {
                    if (selector) {
                        if (dom7_esm_$(parent).is(selector)) parents.push(parent);
                    } else parents.push(parent);
                    parent = parent.parentNode;
                }
            }
            return dom7_esm_$(parents);
        }
        function closest(selector) {
            let closest = this;
            if ("undefined" === typeof selector) return dom7_esm_$([]);
            if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
            return closest;
        }
        function find(selector) {
            const foundElements = [];
            for (let i = 0; i < this.length; i += 1) {
                const found = this[i].querySelectorAll(selector);
                for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
            }
            return dom7_esm_$(foundElements);
        }
        function children(selector) {
            const children = [];
            for (let i = 0; i < this.length; i += 1) {
                const childNodes = this[i].children;
                for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
            }
            return dom7_esm_$(children);
        }
        function remove() {
            for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
            return this;
        }
        const noTrigger = "resize scroll".split(" ");
        function shortcut(name) {
            function eventHandler(...args) {
                if ("undefined" === typeof args[0]) {
                    for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
                    return this;
                }
                return this.on(name, ...args);
            }
            return eventHandler;
        }
        shortcut("click");
        shortcut("blur");
        shortcut("focus");
        shortcut("focusin");
        shortcut("focusout");
        shortcut("keyup");
        shortcut("keydown");
        shortcut("keypress");
        shortcut("submit");
        shortcut("change");
        shortcut("mousedown");
        shortcut("mousemove");
        shortcut("mouseup");
        shortcut("mouseenter");
        shortcut("mouseleave");
        shortcut("mouseout");
        shortcut("mouseover");
        shortcut("touchstart");
        shortcut("touchend");
        shortcut("touchmove");
        shortcut("resize");
        shortcut("scroll");
        const Methods = {
            addClass,
            removeClass,
            hasClass,
            toggleClass,
            attr,
            removeAttr,
            transform,
            transition,
            on,
            off,
            trigger,
            transitionEnd,
            outerWidth: dom7_esm_outerWidth,
            outerHeight: dom7_esm_outerHeight,
            styles,
            offset,
            css,
            each,
            html,
            text: dom7_esm_text,
            is,
            index,
            eq,
            append,
            prepend,
            next,
            nextAll,
            prev,
            prevAll,
            parent: dom7_esm_parent,
            parents,
            closest,
            find,
            children,
            filter,
            remove
        };
        Object.keys(Methods).forEach((methodName => {
            Object.defineProperty(dom7_esm_$.fn, methodName, {
                value: Methods[methodName],
                writable: true
            });
        }));
        const dom = dom7_esm_$;
        function deleteProps(obj) {
            const object = obj;
            Object.keys(object).forEach((key => {
                try {
                    object[key] = null;
                } catch (e) {}
                try {
                    delete object[key];
                } catch (e) {}
            }));
        }
        function utils_nextTick(callback, delay = 0) {
            return setTimeout(callback, delay);
        }
        function utils_now() {
            return Date.now();
        }
        function utils_getComputedStyle(el) {
            const window = ssr_window_esm_getWindow();
            let style;
            if (window.getComputedStyle) style = window.getComputedStyle(el, null);
            if (!style && el.currentStyle) style = el.currentStyle;
            if (!style) style = el.style;
            return style;
        }
        function utils_getTranslate(el, axis = "x") {
            const window = ssr_window_esm_getWindow();
            let matrix;
            let curTransform;
            let transformMatrix;
            const curStyle = utils_getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
                transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                matrix = transformMatrix.toString().split(",");
            }
            if ("x" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (16 === matrix.length) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
            if ("y" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (16 === matrix.length) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
            return curTransform || 0;
        }
        function utils_isObject(o) {
            return "object" === typeof o && null !== o && o.constructor && "Object" === Object.prototype.toString.call(o).slice(8, -1);
        }
        function isNode(node) {
            if ("undefined" !== typeof window && "undefined" !== typeof window.HTMLElement) return node instanceof HTMLElement;
            return node && (1 === node.nodeType || 11 === node.nodeType);
        }
        function utils_extend(...args) {
            const to = Object(args[0]);
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            for (let i = 1; i < args.length; i += 1) {
                const nextSource = args[i];
                if (void 0 !== nextSource && null !== nextSource && !isNode(nextSource)) {
                    const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                        const nextKey = keysArray[nextIndex];
                        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (void 0 !== desc && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                            to[nextKey] = {};
                            if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                        } else to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
        function utils_setCSSProperty(el, varName, varValue) {
            el.style.setProperty(varName, varValue);
        }
        function animateCSSModeScroll({swiper, targetPosition, side}) {
            const window = ssr_window_esm_getWindow();
            const startPosition = -swiper.translate;
            let startTime = null;
            let time;
            const duration = swiper.params.speed;
            swiper.wrapperEl.style.scrollSnapType = "none";
            window.cancelAnimationFrame(swiper.cssModeFrameID);
            const dir = targetPosition > startPosition ? "next" : "prev";
            const isOutOfBound = (current, target) => "next" === dir && current >= target || "prev" === dir && current <= target;
            const animate = () => {
                time = (new Date).getTime();
                if (null === startTime) startTime = time;
                const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
                let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
                if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
                swiper.wrapperEl.scrollTo({
                    [side]: currentPosition
                });
                if (isOutOfBound(currentPosition, targetPosition)) {
                    swiper.wrapperEl.style.overflow = "hidden";
                    swiper.wrapperEl.style.scrollSnapType = "";
                    setTimeout((() => {
                        swiper.wrapperEl.style.overflow = "";
                        swiper.wrapperEl.scrollTo({
                            [side]: currentPosition
                        });
                    }));
                    window.cancelAnimationFrame(swiper.cssModeFrameID);
                    return;
                }
                swiper.cssModeFrameID = window.requestAnimationFrame(animate);
            };
            animate();
        }
        let support;
        function calcSupport() {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            return {
                smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
                passiveListener: function checkPassiveListener() {
                    let supportsPassive = false;
                    try {
                        const opts = Object.defineProperty({}, "passive", {
                            get() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("testPassiveListener", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }(),
                gestures: function checkGestures() {
                    return "ongesturestart" in window;
                }()
            };
        }
        function getSupport() {
            if (!support) support = calcSupport();
            return support;
        }
        let deviceCached;
        function calcDevice({userAgent} = {}) {
            const support = getSupport();
            const window = ssr_window_esm_getWindow();
            const platform = window.navigator.platform;
            const ua = userAgent || window.navigator.userAgent;
            const device = {
                ios: false,
                android: false
            };
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            const windows = "Win32" === platform;
            let macos = "MacIntel" === platform;
            const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
            if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
                ipad = ua.match(/(Version)\/([\d.]+)/);
                if (!ipad) ipad = [ 0, 1, "13_0_0" ];
                macos = false;
            }
            if (android && !windows) {
                device.os = "android";
                device.android = true;
            }
            if (ipad || iphone || ipod) {
                device.os = "ios";
                device.ios = true;
            }
            return device;
        }
        function getDevice(overrides = {}) {
            if (!deviceCached) deviceCached = calcDevice(overrides);
            return deviceCached;
        }
        let browser;
        function calcBrowser() {
            const window = ssr_window_esm_getWindow();
            function isSafari() {
                const ua = window.navigator.userAgent.toLowerCase();
                return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
            }
            return {
                isSafari: isSafari(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
            };
        }
        function getBrowser() {
            if (!browser) browser = calcBrowser();
            return browser;
        }
        function Resize({swiper, on, emit}) {
            const window = ssr_window_esm_getWindow();
            let observer = null;
            let animationFrame = null;
            const resizeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("beforeResize");
                emit("resize");
            };
            const createObserver = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                observer = new ResizeObserver((entries => {
                    animationFrame = window.requestAnimationFrame((() => {
                        const {width, height} = swiper;
                        let newWidth = width;
                        let newHeight = height;
                        entries.forEach((({contentBoxSize, contentRect, target}) => {
                            if (target && target !== swiper.el) return;
                            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                        }));
                        if (newWidth !== width || newHeight !== height) resizeHandler();
                    }));
                }));
                observer.observe(swiper.el);
            };
            const removeObserver = () => {
                if (animationFrame) window.cancelAnimationFrame(animationFrame);
                if (observer && observer.unobserve && swiper.el) {
                    observer.unobserve(swiper.el);
                    observer = null;
                }
            };
            const orientationChangeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("orientationchange");
            };
            on("init", (() => {
                if (swiper.params.resizeObserver && "undefined" !== typeof window.ResizeObserver) {
                    createObserver();
                    return;
                }
                window.addEventListener("resize", resizeHandler);
                window.addEventListener("orientationchange", orientationChangeHandler);
            }));
            on("destroy", (() => {
                removeObserver();
                window.removeEventListener("resize", resizeHandler);
                window.removeEventListener("orientationchange", orientationChangeHandler);
            }));
        }
        function Observer({swiper, extendParams, on, emit}) {
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = (target, options = {}) => {
                const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                const observer = new ObserverFunc((mutations => {
                    if (1 === mutations.length) {
                        emit("observerUpdate", mutations[0]);
                        return;
                    }
                    const observerUpdate = function observerUpdate() {
                        emit("observerUpdate", mutations[0]);
                    };
                    if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
                }));
                observer.observe(target, {
                    attributes: "undefined" === typeof options.attributes ? true : options.attributes,
                    childList: "undefined" === typeof options.childList ? true : options.childList,
                    characterData: "undefined" === typeof options.characterData ? true : options.characterData
                });
                observers.push(observer);
            };
            const init = () => {
                if (!swiper.params.observer) return;
                if (swiper.params.observeParents) {
                    const containerParents = swiper.$el.parents();
                    for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
                }
                attach(swiper.$el[0], {
                    childList: swiper.params.observeSlideChildren
                });
                attach(swiper.$wrapperEl[0], {
                    attributes: false
                });
            };
            const destroy = () => {
                observers.forEach((observer => {
                    observer.disconnect();
                }));
                observers.splice(0, observers.length);
            };
            extendParams({
                observer: false,
                observeParents: false,
                observeSlideChildren: false
            });
            on("init", init);
            on("destroy", destroy);
        }
        const events_emitter = {
            on(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                events.split(" ").forEach((event => {
                    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                    self.eventsListeners[event][method](handler);
                }));
                return self;
            },
            once(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                function onceHandler(...args) {
                    self.off(events, onceHandler);
                    if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                    handler.apply(self, args);
                }
                onceHandler.__emitterProxy = handler;
                return self.on(events, onceHandler, priority);
            },
            onAny(handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
                return self;
            },
            offAny(handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsAnyListeners) return self;
                const index = self.eventsAnyListeners.indexOf(handler);
                if (index >= 0) self.eventsAnyListeners.splice(index, 1);
                return self;
            },
            off(events, handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                events.split(" ").forEach((event => {
                    if ("undefined" === typeof handler) self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                        if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                    }));
                }));
                return self;
            },
            emit(...args) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                let events;
                let data;
                let context;
                if ("string" === typeof args[0] || Array.isArray(args[0])) {
                    events = args[0];
                    data = args.slice(1, args.length);
                    context = self;
                } else {
                    events = args[0].events;
                    data = args[0].data;
                    context = args[0].context || self;
                }
                data.unshift(context);
                const eventsArray = Array.isArray(events) ? events : events.split(" ");
                eventsArray.forEach((event => {
                    if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                        eventHandler.apply(context, [ event, ...data ]);
                    }));
                    if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                        eventHandler.apply(context, data);
                    }));
                }));
                return self;
            }
        };
        function updateSize() {
            const swiper = this;
            let width;
            let height;
            const $el = swiper.$el;
            if ("undefined" !== typeof swiper.params.width && null !== swiper.params.width) width = swiper.params.width; else width = $el[0].clientWidth;
            if ("undefined" !== typeof swiper.params.height && null !== swiper.params.height) height = swiper.params.height; else height = $el[0].clientHeight;
            if (0 === width && swiper.isHorizontal() || 0 === height && swiper.isVertical()) return;
            width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
            height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
            if (Number.isNaN(width)) width = 0;
            if (Number.isNaN(height)) height = 0;
            Object.assign(swiper, {
                width,
                height,
                size: swiper.isHorizontal() ? width : height
            });
        }
        function updateSlides() {
            const swiper = this;
            function getDirectionLabel(property) {
                if (swiper.isHorizontal()) return property;
                return {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[property];
            }
            function getDirectionPropertyValue(node, label) {
                return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
            }
            const params = swiper.params;
            const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
            const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
            const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
            let snapGrid = [];
            const slidesGrid = [];
            const slidesSizesGrid = [];
            let offsetBefore = params.slidesOffsetBefore;
            if ("function" === typeof offsetBefore) offsetBefore = params.slidesOffsetBefore.call(swiper);
            let offsetAfter = params.slidesOffsetAfter;
            if ("function" === typeof offsetAfter) offsetAfter = params.slidesOffsetAfter.call(swiper);
            const previousSnapGridLength = swiper.snapGrid.length;
            const previousSlidesGridLength = swiper.slidesGrid.length;
            let spaceBetween = params.spaceBetween;
            let slidePosition = -offsetBefore;
            let prevSlideSize = 0;
            let index = 0;
            if ("undefined" === typeof swiperSize) return;
            if ("string" === typeof spaceBetween && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
            swiper.virtualSize = -spaceBetween;
            if (rtl) slides.css({
                marginLeft: "",
                marginBottom: "",
                marginTop: ""
            }); else slides.css({
                marginRight: "",
                marginBottom: "",
                marginTop: ""
            });
            if (params.centeredSlides && params.cssMode) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
            }
            const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
            if (gridEnabled) swiper.grid.initSlides(slidesLength);
            let slideSize;
            const shouldResetSlideSize = "auto" === params.slidesPerView && params.breakpoints && Object.keys(params.breakpoints).filter((key => "undefined" !== typeof params.breakpoints[key].slidesPerView)).length > 0;
            for (let i = 0; i < slidesLength; i += 1) {
                slideSize = 0;
                const slide = slides.eq(i);
                if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
                if ("none" === slide.css("display")) continue;
                if ("auto" === params.slidesPerView) {
                    if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                    const slideStyles = getComputedStyle(slide[0]);
                    const currentTransform = slide[0].style.transform;
                    const currentWebKitTransform = slide[0].style.webkitTransform;
                    if (currentTransform) slide[0].style.transform = "none";
                    if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
                    if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
                        const width = getDirectionPropertyValue(slideStyles, "width");
                        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                        const boxSizing = slideStyles.getPropertyValue("box-sizing");
                        if (boxSizing && "border-box" === boxSizing) slideSize = width + marginLeft + marginRight; else {
                            const {clientWidth, offsetWidth} = slide[0];
                            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                        }
                    }
                    if (currentTransform) slide[0].style.transform = currentTransform;
                    if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                } else {
                    slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                    if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
                }
                if (slides[i]) slides[i].swiperSlideSize = slideSize;
                slidesSizesGrid.push(slideSize);
                if (params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (0 === prevSlideSize && 0 !== i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (0 === i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                } else {
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
                swiper.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index += 1;
            }
            swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
            if (rtl && wrongRTL && ("slide" === params.effect || "coverflow" === params.effect)) $wrapperEl.css({
                width: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (params.setWrapperSize) $wrapperEl.css({
                [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
            if (!params.centeredSlides) {
                const newSlidesGrid = [];
                for (let i = 0; i < snapGrid.length; i += 1) {
                    let slidesGridItem = snapGrid[i];
                    if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                    if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
                }
                snapGrid = newSlidesGrid;
                if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
            }
            if (0 === snapGrid.length) snapGrid = [ 0 ];
            if (0 !== params.spaceBetween) {
                const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
                slides.filter(((_, slideIndex) => {
                    if (!params.cssMode) return true;
                    if (slideIndex === slides.length - 1) return false;
                    return true;
                })).css({
                    [key]: `${spaceBetween}px`
                });
            }
            if (params.centeredSlides && params.centeredSlidesBounds) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                const maxSnap = allSlidesSize - swiperSize;
                snapGrid = snapGrid.map((snap => {
                    if (snap < 0) return -offsetBefore;
                    if (snap > maxSnap) return maxSnap + offsetAfter;
                    return snap;
                }));
            }
            if (params.centerInsufficientSlides) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                if (allSlidesSize < swiperSize) {
                    const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                    snapGrid.forEach(((snap, snapIndex) => {
                        snapGrid[snapIndex] = snap - allSlidesOffset;
                    }));
                    slidesGrid.forEach(((snap, snapIndex) => {
                        slidesGrid[snapIndex] = snap + allSlidesOffset;
                    }));
                }
            }
            Object.assign(swiper, {
                slides,
                snapGrid,
                slidesGrid,
                slidesSizesGrid
            });
            if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
                const addToSnapGrid = -swiper.snapGrid[0];
                const addToSlidesGrid = -swiper.slidesGrid[0];
                swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
                swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
            }
            if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
            if (snapGrid.length !== previousSnapGridLength) {
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                swiper.emit("snapGridLengthChange");
            }
            if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
            if (!isVirtual && !params.cssMode && ("slide" === params.effect || "fade" === params.effect)) {
                const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
                const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
                if (slidesLength <= params.maxBackfaceHiddenSlides) {
                    if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
                } else if (hasClassBackfaceClassAdded) swiper.$el.removeClass(backFaceHiddenClass);
            }
        }
        function updateAutoHeight(speed) {
            const swiper = this;
            const activeSlides = [];
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let newHeight = 0;
            let i;
            if ("number" === typeof speed) swiper.setTransition(speed); else if (true === speed) swiper.setTransition(swiper.params.speed);
            const getSlideByIndex = index => {
                if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
                return swiper.slides.eq(index)[0];
            };
            if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || dom([])).each((slide => {
                activeSlides.push(slide);
            })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
                const index = swiper.activeIndex + i;
                if (index > swiper.slides.length && !isVirtual) break;
                activeSlides.push(getSlideByIndex(index));
            } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
            for (i = 0; i < activeSlides.length; i += 1) if ("undefined" !== typeof activeSlides[i]) {
                const height = activeSlides[i].offsetHeight;
                newHeight = height > newHeight ? height : newHeight;
            }
            if (newHeight || 0 === newHeight) swiper.$wrapperEl.css("height", `${newHeight}px`);
        }
        function updateSlidesOffset() {
            const swiper = this;
            const slides = swiper.slides;
            for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
        }
        function updateSlidesProgress(translate = this && this.translate || 0) {
            const swiper = this;
            const params = swiper.params;
            const {slides, rtlTranslate: rtl, snapGrid} = swiper;
            if (0 === slides.length) return;
            if ("undefined" === typeof slides[0].swiperSlideOffset) swiper.updateSlidesOffset();
            let offsetCenter = -translate;
            if (rtl) offsetCenter = translate;
            slides.removeClass(params.slideVisibleClass);
            swiper.visibleSlidesIndexes = [];
            swiper.visibleSlides = [];
            for (let i = 0; i < slides.length; i += 1) {
                const slide = slides[i];
                let slideOffset = slide.swiperSlideOffset;
                if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
                const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const slideBefore = -(offsetCenter - slideOffset);
                const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
                const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
                if (isVisible) {
                    swiper.visibleSlides.push(slide);
                    swiper.visibleSlidesIndexes.push(i);
                    slides.eq(i).addClass(params.slideVisibleClass);
                }
                slide.progress = rtl ? -slideProgress : slideProgress;
                slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
            }
            swiper.visibleSlides = dom(swiper.visibleSlides);
        }
        function updateProgress(translate) {
            const swiper = this;
            if ("undefined" === typeof translate) {
                const multiplier = swiper.rtlTranslate ? -1 : 1;
                translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
            }
            const params = swiper.params;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            let {progress, isBeginning, isEnd} = swiper;
            const wasBeginning = isBeginning;
            const wasEnd = isEnd;
            if (0 === translatesDiff) {
                progress = 0;
                isBeginning = true;
                isEnd = true;
            } else {
                progress = (translate - swiper.minTranslate()) / translatesDiff;
                isBeginning = progress <= 0;
                isEnd = progress >= 1;
            }
            Object.assign(swiper, {
                progress,
                isBeginning,
                isEnd
            });
            if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
            if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
            if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
            if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
            swiper.emit("progress", progress);
        }
        function updateSlidesClasses() {
            const swiper = this;
            const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
            let activeSlide;
            if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
            activeSlide.addClass(params.slideActiveClass);
            if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
            let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
            if (params.loop && 0 === nextSlide.length) {
                nextSlide = slides.eq(0);
                nextSlide.addClass(params.slideNextClass);
            }
            let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
            if (params.loop && 0 === prevSlide.length) {
                prevSlide = slides.eq(-1);
                prevSlide.addClass(params.slidePrevClass);
            }
            if (params.loop) {
                if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
                if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
            }
            swiper.emitSlidesClasses();
        }
        function updateActiveIndex(newActiveIndex) {
            const swiper = this;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            const {slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
            let activeIndex = newActiveIndex;
            let snapIndex;
            if ("undefined" === typeof activeIndex) {
                for (let i = 0; i < slidesGrid.length; i += 1) if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
                } else if (translate >= slidesGrid[i]) activeIndex = i;
                if (params.normalizeSlideIndex) if (activeIndex < 0 || "undefined" === typeof activeIndex) activeIndex = 0;
            }
            if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
                const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
                snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
            }
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if (activeIndex === previousIndex) {
                if (snapIndex !== previousSnapIndex) {
                    swiper.snapIndex = snapIndex;
                    swiper.emit("snapIndexChange");
                }
                return;
            }
            const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
            Object.assign(swiper, {
                snapIndex,
                realIndex,
                previousIndex,
                activeIndex
            });
            swiper.emit("activeIndexChange");
            swiper.emit("snapIndexChange");
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
        }
        function updateClickedSlide(e) {
            const swiper = this;
            const params = swiper.params;
            const slide = dom(e).closest(`.${params.slideClass}`)[0];
            let slideFound = false;
            let slideIndex;
            if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
                slideFound = true;
                slideIndex = i;
                break;
            }
            if (slide && slideFound) {
                swiper.clickedSlide = slide;
                if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
            } else {
                swiper.clickedSlide = void 0;
                swiper.clickedIndex = void 0;
                return;
            }
            if (params.slideToClickedSlide && void 0 !== swiper.clickedIndex && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
        }
        const update = {
            updateSize,
            updateSlides,
            updateAutoHeight,
            updateSlidesOffset,
            updateSlidesProgress,
            updateProgress,
            updateSlidesClasses,
            updateActiveIndex,
            updateClickedSlide
        };
        function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
            const swiper = this;
            const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;
            if (params.virtualTranslate) return rtl ? -translate : translate;
            if (params.cssMode) return translate;
            let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
            if (rtl) currentTranslate = -currentTranslate;
            return currentTranslate || 0;
        }
        function setTranslate(translate, byController) {
            const swiper = this;
            const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
            let x = 0;
            let y = 0;
            const z = 0;
            if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
            if (params.roundLengths) {
                x = Math.floor(x);
                y = Math.floor(y);
            }
            if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
            swiper.previousTranslate = swiper.translate;
            swiper.translate = swiper.isHorizontal() ? x : y;
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== progress) swiper.updateProgress(translate);
            swiper.emit("setTranslate", swiper.translate, byController);
        }
        function minTranslate() {
            return -this.snapGrid[0];
        }
        function maxTranslate() {
            return -this.snapGrid[this.snapGrid.length - 1];
        }
        function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
            const swiper = this;
            const {params, wrapperEl} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition) return false;
            const minTranslate = swiper.minTranslate();
            const maxTranslate = swiper.maxTranslate();
            let newTranslate;
            if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
            swiper.updateProgress(newTranslate);
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                if (0 === speed) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: -newTranslate,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: -newTranslate,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            if (0 === speed) {
                swiper.setTransition(0);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionEnd");
                }
            } else {
                swiper.setTransition(speed);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionStart");
                }
                if (!swiper.animating) {
                    swiper.animating = true;
                    if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                        if (!swiper || swiper.destroyed) return;
                        if (e.target !== this) return;
                        swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.onTranslateToWrapperTransitionEnd = null;
                        delete swiper.onTranslateToWrapperTransitionEnd;
                        if (runCallbacks) swiper.emit("transitionEnd");
                    };
                    swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                }
            }
            return true;
        }
        const translate = {
            getTranslate: getSwiperTranslate,
            setTranslate,
            minTranslate,
            maxTranslate,
            translateTo
        };
        function setTransition(duration, byController) {
            const swiper = this;
            if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
            swiper.emit("setTransition", duration, byController);
        }
        function transitionEmit({swiper, runCallbacks, direction, step}) {
            const {activeIndex, previousIndex} = swiper;
            let dir = direction;
            if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
            swiper.emit(`transition${step}`);
            if (runCallbacks && activeIndex !== previousIndex) {
                if ("reset" === dir) {
                    swiper.emit(`slideResetTransition${step}`);
                    return;
                }
                swiper.emit(`slideChangeTransition${step}`);
                if ("next" === dir) swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
            }
        }
        function transitionStart(runCallbacks = true, direction) {
            const swiper = this;
            const {params} = swiper;
            if (params.cssMode) return;
            if (params.autoHeight) swiper.updateAutoHeight();
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "Start"
            });
        }
        function transitionEnd_transitionEnd(runCallbacks = true, direction) {
            const swiper = this;
            const {params} = swiper;
            swiper.animating = false;
            if (params.cssMode) return;
            swiper.setTransition(0);
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "End"
            });
        }
        const core_transition = {
            setTransition,
            transitionStart,
            transitionEnd: transitionEnd_transitionEnd
        };
        function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
            if ("number" !== typeof index && "string" !== typeof index) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let slideIndex = index;
            if (slideIndex < 0) slideIndex = 0;
            const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
            let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            const translate = -snapGrid[snapIndex];
            if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
                const normalizedTranslate = -Math.floor(100 * translate);
                const normalizedGrid = Math.floor(100 * slidesGrid[i]);
                const normalizedGridNext = Math.floor(100 * slidesGrid[i + 1]);
                if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
                } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
            }
            if (swiper.initialized && slideIndex !== activeIndex) {
                if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
                if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
            }
            if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
            swiper.updateProgress(translate);
            let direction;
            if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
            if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
                swiper.updateActiveIndex(slideIndex);
                if (params.autoHeight) swiper.updateAutoHeight();
                swiper.updateSlidesClasses();
                if ("slide" !== params.effect) swiper.setTranslate(translate);
                if ("reset" !== direction) {
                    swiper.transitionStart(runCallbacks, direction);
                    swiper.transitionEnd(runCallbacks, direction);
                }
                return false;
            }
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                const t = rtl ? translate : -translate;
                if (0 === speed) {
                    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                    if (isVirtual) {
                        swiper.wrapperEl.style.scrollSnapType = "none";
                        swiper._immediateVirtual = true;
                    }
                    wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    if (isVirtual) requestAnimationFrame((() => {
                        swiper.wrapperEl.style.scrollSnapType = "";
                        swiper._swiperImmediateVirtual = false;
                    }));
                } else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: t,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: t,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit("beforeTransitionStart", speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (0 === speed) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
                    swiper.onSlideToWrapperTransitionEnd = null;
                    delete swiper.onSlideToWrapperTransitionEnd;
                    swiper.transitionEnd(runCallbacks, direction);
                };
                swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
            }
            return true;
        }
        function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let newIndex = index;
            if (swiper.params.loop) newIndex += swiper.loopedSlides;
            return swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }
        function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            const {animating, enabled, params} = swiper;
            if (!enabled) return swiper;
            let perGroup = params.slidesPerGroup;
            if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
            const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
            return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        }
        function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
            if (!enabled) return swiper;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            const translate = rtlTranslate ? swiper.translate : -swiper.translate;
            function normalize(val) {
                if (val < 0) return -Math.floor(Math.abs(val));
                return Math.floor(val);
            }
            const normalizedTranslate = normalize(translate);
            const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
            let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
            if ("undefined" === typeof prevSnap && params.cssMode) {
                let prevSnapIndex;
                snapGrid.forEach(((snap, snapIndex) => {
                    if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
                }));
                if ("undefined" !== typeof prevSnapIndex) prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
            }
            let prevIndex = 0;
            if ("undefined" !== typeof prevSnap) {
                prevIndex = slidesGrid.indexOf(prevSnap);
                if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
                if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) {
                    prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                    prevIndex = Math.max(prevIndex, 0);
                }
            }
            if (params.rewind && swiper.isBeginning) {
                const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
                return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
            }
            return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
        }
        function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }
        function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = .5) {
            const swiper = this;
            let index = swiper.activeIndex;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
            const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            if (translate >= swiper.snapGrid[snapIndex]) {
                const currentSnap = swiper.snapGrid[snapIndex];
                const nextSnap = swiper.snapGrid[snapIndex + 1];
                if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
            } else {
                const prevSnap = swiper.snapGrid[snapIndex - 1];
                const currentSnap = swiper.snapGrid[snapIndex];
                if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
            }
            index = Math.max(index, 0);
            index = Math.min(index, swiper.slidesGrid.length - 1);
            return swiper.slideTo(index, speed, runCallbacks, internal);
        }
        function slideToClickedSlide() {
            const swiper = this;
            const {params, $wrapperEl} = swiper;
            const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : params.slidesPerView;
            let slideToIndex = swiper.clickedIndex;
            let realIndex;
            if (params.loop) {
                if (swiper.animating) return;
                realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
                if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex);
            } else swiper.slideTo(slideToIndex);
        }
        const slide = {
            slideTo,
            slideToLoop,
            slideNext,
            slidePrev,
            slideReset,
            slideToClosest,
            slideToClickedSlide
        };
        function loopCreate() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, $wrapperEl} = swiper;
            const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
            $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
            let slides = $selector.children(`.${params.slideClass}`);
            if (params.loopFillGroupWithBlank) {
                const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
                if (blankSlidesNum !== params.slidesPerGroup) {
                    for (let i = 0; i < blankSlidesNum; i += 1) {
                        const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
                        $selector.append(blankNode);
                    }
                    slides = $selector.children(`.${params.slideClass}`);
                }
            }
            if ("auto" === params.slidesPerView && !params.loopedSlides) params.loopedSlides = slides.length;
            swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
            swiper.loopedSlides += params.loopAdditionalSlides;
            if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) swiper.loopedSlides = slides.length;
            const prependSlides = [];
            const appendSlides = [];
            slides.each(((el, index) => {
                const slide = dom(el);
                slide.attr("data-swiper-slide-index", index);
            }));
            for (let i = 0; i < swiper.loopedSlides; i += 1) {
                const index = i - Math.floor(i / slides.length) * slides.length;
                appendSlides.push(slides.eq(index)[0]);
                prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
            }
            for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
            for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
        function loopFix() {
            const swiper = this;
            swiper.emit("beforeLoopFix");
            const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
            let newIndex;
            swiper.allowSlidePrev = true;
            swiper.allowSlideNext = true;
            const snapTranslate = -snapGrid[activeIndex];
            const diff = snapTranslate - swiper.getTranslate();
            if (activeIndex < loopedSlides) {
                newIndex = slides.length - 3 * loopedSlides + activeIndex;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            } else if (activeIndex >= slides.length - loopedSlides) {
                newIndex = -slides.length + activeIndex + loopedSlides;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
        }
        function loopDestroy() {
            const swiper = this;
            const {$wrapperEl, params, slides} = swiper;
            $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
            slides.removeAttr("data-swiper-slide-index");
        }
        const loop = {
            loopCreate,
            loopFix,
            loopDestroy
        };
        function setGrabCursor(moving) {
            const swiper = this;
            if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            const el = "container" === swiper.params.touchEventsTarget ? swiper.el : swiper.wrapperEl;
            el.style.cursor = "move";
            el.style.cursor = moving ? "grabbing" : "grab";
        }
        function unsetGrabCursor() {
            const swiper = this;
            if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            swiper["container" === swiper.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "";
        }
        const grab_cursor = {
            setGrabCursor,
            unsetGrabCursor
        };
        function closestElement(selector, base = this) {
            function __closestFrom(el) {
                if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
                if (el.assignedSlot) el = el.assignedSlot;
                const found = el.closest(selector);
                if (!found && !el.getRootNode) return null;
                return found || __closestFrom(el.getRootNode().host);
            }
            return __closestFrom(base);
        }
        function onTouchStart(event) {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const window = ssr_window_esm_getWindow();
            const data = swiper.touchEventsData;
            const {params, touches, enabled} = swiper;
            if (!enabled) return;
            if (swiper.animating && params.preventInteractionOnTransition) return;
            if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            let $targetEl = dom(e.target);
            if ("wrapper" === params.touchEventsTarget) if (!$targetEl.closest(swiper.wrapperEl).length) return;
            data.isTouchEvent = "touchstart" === e.type;
            if (!data.isTouchEvent && "which" in e && 3 === e.which) return;
            if (!data.isTouchEvent && "button" in e && e.button > 0) return;
            if (data.isTouched && data.isMoved) return;
            const swipingClassHasValue = !!params.noSwipingClass && "" !== params.noSwipingClass;
            const eventPath = event.composedPath ? event.composedPath() : event.path;
            if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) $targetEl = dom(eventPath[0]);
            const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
            const isTargetShadow = !!(e.target && e.target.shadowRoot);
            if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
                swiper.allowClick = true;
                return;
            }
            if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
            touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX;
            touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
            const startX = touches.currentX;
            const startY = touches.currentY;
            const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
            const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
            if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if ("prevent" === edgeSwipeDetection) event.preventDefault(); else return;
            Object.assign(data, {
                isTouched: true,
                isMoved: false,
                allowTouchCallbacks: true,
                isScrolling: void 0,
                startMoving: void 0
            });
            touches.startX = startX;
            touches.startY = startY;
            data.touchStartTime = utils_now();
            swiper.allowClick = true;
            swiper.updateSize();
            swiper.swipeDirection = void 0;
            if (params.threshold > 0) data.allowThresholdMove = false;
            if ("touchstart" !== e.type) {
                let preventDefault = true;
                if ($targetEl.is(data.focusableElements)) {
                    preventDefault = false;
                    if ("SELECT" === $targetEl[0].nodeName) data.isTouched = false;
                }
                if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
                const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
                if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
            }
            if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
            swiper.emit("touchStart", e);
        }
        function onTouchMove(event) {
            const document = ssr_window_esm_getDocument();
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (!data.isTouched) {
                if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
                return;
            }
            if (data.isTouchEvent && "touchmove" !== e.type) return;
            const targetTouch = "touchmove" === e.type && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
            const pageX = "touchmove" === e.type ? targetTouch.pageX : e.pageX;
            const pageY = "touchmove" === e.type ? targetTouch.pageY : e.pageY;
            if (e.preventedByNestedSwiper) {
                touches.startX = pageX;
                touches.startY = pageY;
                return;
            }
            if (!swiper.allowTouchMove) {
                if (!dom(e.target).is(data.focusableElements)) swiper.allowClick = false;
                if (data.isTouched) {
                    Object.assign(touches, {
                        startX: pageX,
                        startY: pageY,
                        currentX: pageX,
                        currentY: pageY
                    });
                    data.touchStartTime = utils_now();
                }
                return;
            }
            if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
                if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                    data.isTouched = false;
                    data.isMoved = false;
                    return;
                }
            } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
            if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
                data.isMoved = true;
                swiper.allowClick = false;
                return;
            }
            if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
            if (e.targetTouches && e.targetTouches.length > 1) return;
            touches.currentX = pageX;
            touches.currentY = pageY;
            const diffX = touches.currentX - touches.startX;
            const diffY = touches.currentY - touches.startY;
            if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
            if ("undefined" === typeof data.isScrolling) {
                let touchAngle;
                if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                    touchAngle = 180 * Math.atan2(Math.abs(diffY), Math.abs(diffX)) / Math.PI;
                    data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
                }
            }
            if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
            if ("undefined" === typeof data.startMoving) if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
            if (data.isScrolling) {
                data.isTouched = false;
                return;
            }
            if (!data.startMoving) return;
            swiper.allowClick = false;
            if (!params.cssMode && e.cancelable) e.preventDefault();
            if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
            if (!data.isMoved) {
                if (params.loop && !params.cssMode) swiper.loopFix();
                data.startTranslate = swiper.getTranslate();
                swiper.setTransition(0);
                if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
                data.allowMomentumBounce = false;
                if (params.grabCursor && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(true);
                swiper.emit("sliderFirstMove", e);
            }
            swiper.emit("sliderMove", e);
            data.isMoved = true;
            let diff = swiper.isHorizontal() ? diffX : diffY;
            touches.diff = diff;
            diff *= params.touchRatio;
            if (rtl) diff = -diff;
            swiper.swipeDirection = diff > 0 ? "prev" : "next";
            data.currentTranslate = diff + data.startTranslate;
            let disableParentSwiper = true;
            let resistanceRatio = params.resistanceRatio;
            if (params.touchReleaseOnEdges) resistanceRatio = 0;
            if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
            if (disableParentSwiper) e.preventedByNestedSwiper = true;
            if (!swiper.allowSlideNext && "next" === swiper.swipeDirection && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && "prev" === swiper.swipeDirection && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
            if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
                if (!data.allowThresholdMove) {
                    data.allowThresholdMove = true;
                    touches.startX = touches.currentX;
                    touches.startY = touches.currentY;
                    data.currentTranslate = data.startTranslate;
                    touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                    return;
                }
            } else {
                data.currentTranslate = data.startTranslate;
                return;
            }
            if (!params.followFinger || params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
            swiper.updateProgress(data.currentTranslate);
            swiper.setTranslate(data.currentTranslate);
        }
        function onTouchEnd(event) {
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
            data.allowTouchCallbacks = false;
            if (!data.isTouched) {
                if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            if (params.grabCursor && data.isMoved && data.isTouched && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(false);
            const touchEndTime = utils_now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (swiper.allowClick) {
                const pathTree = e.path || e.composedPath && e.composedPath();
                swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
                swiper.emit("tap click", e);
                if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
            }
            data.lastClickTime = utils_now();
            utils_nextTick((() => {
                if (!swiper.destroyed) swiper.allowClick = true;
            }));
            if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || 0 === touches.diff || data.currentTranslate === data.startTranslate) {
                data.isTouched = false;
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            let currentPos;
            if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
            if (params.cssMode) return;
            if (swiper.params.freeMode && params.freeMode.enabled) {
                swiper.freeMode.onTouchEnd({
                    currentPos
                });
                return;
            }
            let stopIndex = 0;
            let groupSize = swiper.slidesSizesGrid[0];
            for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
                const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
                if ("undefined" !== typeof slidesGrid[i + increment]) {
                    if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                        stopIndex = i;
                        groupSize = slidesGrid[i + increment] - slidesGrid[i];
                    }
                } else if (currentPos >= slidesGrid[i]) {
                    stopIndex = i;
                    groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
                }
            }
            let rewindFirstIndex = null;
            let rewindLastIndex = null;
            if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
            const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
            const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (timeDiff > params.longSwipesMs) {
                if (!params.longSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                if ("next" === swiper.swipeDirection) if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
                if ("prev" === swiper.swipeDirection) if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (null !== rewindLastIndex && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
            } else {
                if (!params.shortSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
                if (!isNavButtonTarget) {
                    if ("next" === swiper.swipeDirection) swiper.slideTo(null !== rewindFirstIndex ? rewindFirstIndex : stopIndex + increment);
                    if ("prev" === swiper.swipeDirection) swiper.slideTo(null !== rewindLastIndex ? rewindLastIndex : stopIndex);
                } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
            }
        }
        function onResize() {
            const swiper = this;
            const {params, el} = swiper;
            if (el && 0 === el.offsetWidth) return;
            if (params.breakpoints) swiper.setBreakpoint();
            const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateSlidesClasses();
            if (("auto" === params.slidesPerView || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
            if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
        }
        function onClick(e) {
            const swiper = this;
            if (!swiper.enabled) return;
            if (!swiper.allowClick) {
                if (swiper.params.preventClicks) e.preventDefault();
                if (swiper.params.preventClicksPropagation && swiper.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        }
        function onScroll() {
            const swiper = this;
            const {wrapperEl, rtlTranslate, enabled} = swiper;
            if (!enabled) return;
            swiper.previousTranslate = swiper.translate;
            if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
            if (0 === swiper.translate) swiper.translate = 0;
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
            swiper.emit("setTranslate", swiper.translate, false);
        }
        let dummyEventAttached = false;
        function dummyEventListener() {}
        const events = (swiper, method) => {
            const document = ssr_window_esm_getDocument();
            const {params, touchEvents, el, wrapperEl, device, support} = swiper;
            const capture = !!params.nested;
            const domMethod = "on" === method ? "addEventListener" : "removeEventListener";
            const swiperMethod = method;
            if (!support.touch) {
                el[domMethod](touchEvents.start, swiper.onTouchStart, false);
                document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
                document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
            } else {
                const passiveListener = "touchstart" === touchEvents.start && support.passiveListener && params.passiveListeners ? {
                    passive: true,
                    capture: false
                } : false;
                el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
                el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
                    passive: false,
                    capture
                } : capture);
                el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
                if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
            }
            if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
            if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
            if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        };
        function attachEvents() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, support} = swiper;
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
            if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
            swiper.onClick = onClick.bind(swiper);
            if (support.touch && !dummyEventAttached) {
                document.addEventListener("touchstart", dummyEventListener);
                dummyEventAttached = true;
            }
            events(swiper, "on");
        }
        function detachEvents() {
            const swiper = this;
            events(swiper, "off");
        }
        const core_events = {
            attachEvents,
            detachEvents
        };
        const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
        function setBreakpoint() {
            const swiper = this;
            const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
            const breakpoints = params.breakpoints;
            if (!breakpoints || breakpoints && 0 === Object.keys(breakpoints).length) return;
            const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
            if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
            const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
            const breakpointParams = breakpointOnlyParams || swiper.originalParams;
            const wasMultiRow = isGridEnabled(swiper, params);
            const isMultiRow = isGridEnabled(swiper, breakpointParams);
            const wasEnabled = params.enabled;
            if (wasMultiRow && !isMultiRow) {
                $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            } else if (!wasMultiRow && isMultiRow) {
                $el.addClass(`${params.containerModifierClass}grid`);
                if (breakpointParams.grid.fill && "column" === breakpointParams.grid.fill || !breakpointParams.grid.fill && "column" === params.grid.fill) $el.addClass(`${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            }
            [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
                const wasModuleEnabled = params[prop] && params[prop].enabled;
                const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
                if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
                if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
            }));
            const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
            const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
            if (directionChanged && initialized) swiper.changeDirection();
            utils_extend(swiper.params, breakpointParams);
            const isEnabled = swiper.params.enabled;
            Object.assign(swiper, {
                allowTouchMove: swiper.params.allowTouchMove,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev
            });
            if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
            swiper.currentBreakpoint = breakpoint;
            swiper.emit("_beforeBreakpoint", breakpointParams);
            if (needsReLoop && initialized) {
                swiper.loopDestroy();
                swiper.loopCreate();
                swiper.updateSlides();
                swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
            }
            swiper.emit("breakpoint", breakpointParams);
        }
        function getBreakpoint(breakpoints, base = "window", containerEl) {
            if (!breakpoints || "container" === base && !containerEl) return;
            let breakpoint = false;
            const window = ssr_window_esm_getWindow();
            const currentHeight = "window" === base ? window.innerHeight : containerEl.clientHeight;
            const points = Object.keys(breakpoints).map((point => {
                if ("string" === typeof point && 0 === point.indexOf("@")) {
                    const minRatio = parseFloat(point.substr(1));
                    const value = currentHeight * minRatio;
                    return {
                        value,
                        point
                    };
                }
                return {
                    value: point,
                    point
                };
            }));
            points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
            for (let i = 0; i < points.length; i += 1) {
                const {point, value} = points[i];
                if ("window" === base) {
                    if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
                } else if (value <= containerEl.clientWidth) breakpoint = point;
            }
            return breakpoint || "max";
        }
        const breakpoints = {
            setBreakpoint,
            getBreakpoint
        };
        function prepareClasses(entries, prefix) {
            const resultClasses = [];
            entries.forEach((item => {
                if ("object" === typeof item) Object.keys(item).forEach((classNames => {
                    if (item[classNames]) resultClasses.push(prefix + classNames);
                })); else if ("string" === typeof item) resultClasses.push(prefix + item);
            }));
            return resultClasses;
        }
        function addClasses() {
            const swiper = this;
            const {classNames, params, rtl, $el, device, support} = swiper;
            const suffixes = prepareClasses([ "initialized", params.direction, {
                "pointer-events": !support.touch
            }, {
                "free-mode": swiper.params.freeMode && params.freeMode.enabled
            }, {
                autoheight: params.autoHeight
            }, {
                rtl
            }, {
                grid: params.grid && params.grid.rows > 1
            }, {
                "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
            }, {
                android: device.android
            }, {
                ios: device.ios
            }, {
                "css-mode": params.cssMode
            }, {
                centered: params.cssMode && params.centeredSlides
            }, {
                "watch-progress": params.watchSlidesProgress
            } ], params.containerModifierClass);
            classNames.push(...suffixes);
            $el.addClass([ ...classNames ].join(" "));
            swiper.emitContainerClasses();
        }
        function removeClasses_removeClasses() {
            const swiper = this;
            const {$el, classNames} = swiper;
            $el.removeClass(classNames.join(" "));
            swiper.emitContainerClasses();
        }
        const classes = {
            addClasses,
            removeClasses: removeClasses_removeClasses
        };
        function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
            const window = ssr_window_esm_getWindow();
            let image;
            function onReady() {
                if (callback) callback();
            }
            const isPicture = dom(imageEl).parent("picture")[0];
            if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
                image = new window.Image;
                image.onload = onReady;
                image.onerror = onReady;
                if (sizes) image.sizes = sizes;
                if (srcset) image.srcset = srcset;
                if (src) image.src = src;
            } else onReady(); else onReady();
        }
        function preloadImages() {
            const swiper = this;
            swiper.imagesToLoad = swiper.$el.find("img");
            function onReady() {
                if ("undefined" === typeof swiper || null === swiper || !swiper || swiper.destroyed) return;
                if (void 0 !== swiper.imagesLoaded) swiper.imagesLoaded += 1;
                if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                    if (swiper.params.updateOnImagesReady) swiper.update();
                    swiper.emit("imagesReady");
                }
            }
            for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
                const imageEl = swiper.imagesToLoad[i];
                swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
            }
        }
        const core_images = {
            loadImage,
            preloadImages
        };
        function checkOverflow() {
            const swiper = this;
            const {isLocked: wasLocked, params} = swiper;
            const {slidesOffsetBefore} = params;
            if (slidesOffsetBefore) {
                const lastSlideIndex = swiper.slides.length - 1;
                const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + 2 * slidesOffsetBefore;
                swiper.isLocked = swiper.size > lastSlideRightEdge;
            } else swiper.isLocked = 1 === swiper.snapGrid.length;
            if (true === params.allowSlideNext) swiper.allowSlideNext = !swiper.isLocked;
            if (true === params.allowSlidePrev) swiper.allowSlidePrev = !swiper.isLocked;
            if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
            if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
        }
        const check_overflow = {
            checkOverflow
        };
        const defaults = {
            init: true,
            direction: "horizontal",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: false,
            updateOnWindowResize: true,
            resizeObserver: true,
            nested: false,
            createElements: false,
            enabled: true,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: false,
            userAgent: null,
            url: null,
            edgeSwipeDetection: false,
            edgeSwipeThreshold: 20,
            autoHeight: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: false,
            centeredSlides: false,
            centeredSlidesBounds: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: true,
            centerInsufficientSlides: false,
            watchOverflow: true,
            roundLengths: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: true,
            allowTouchMove: true,
            threshold: 0,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: true,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: false,
            uniqueNavElements: true,
            resistance: true,
            resistanceRatio: .85,
            watchSlidesProgress: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            preloadImages: true,
            updateOnImagesReady: true,
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopedSlidesLimit: true,
            loopFillGroupWithBlank: false,
            loopPreventsSlide: true,
            rewind: false,
            allowSlidePrev: true,
            allowSlideNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: true,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: true,
            _emitClasses: false
        };
        function moduleExtendParams(params, allModulesParams) {
            return function extendParams(obj = {}) {
                const moduleParamName = Object.keys(obj)[0];
                const moduleParams = obj[moduleParamName];
                if ("object" !== typeof moduleParams || null === moduleParams) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && true === params[moduleParamName]) params[moduleParamName] = {
                    auto: true
                };
                if (!(moduleParamName in params && "enabled" in moduleParams)) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (true === params[moduleParamName]) params[moduleParamName] = {
                    enabled: true
                };
                if ("object" === typeof params[moduleParamName] && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
                if (!params[moduleParamName]) params[moduleParamName] = {
                    enabled: false
                };
                utils_extend(allModulesParams, obj);
            };
        }
        const prototypes = {
            eventsEmitter: events_emitter,
            update,
            translate,
            transition: core_transition,
            slide,
            loop,
            grabCursor: grab_cursor,
            events: core_events,
            breakpoints,
            checkOverflow: check_overflow,
            classes,
            images: core_images
        };
        const extendedDefaults = {};
        class core_Swiper {
            constructor(...args) {
                let el;
                let params;
                if (1 === args.length && args[0].constructor && "Object" === Object.prototype.toString.call(args[0]).slice(8, -1)) params = args[0]; else [el, params] = args;
                if (!params) params = {};
                params = utils_extend({}, params);
                if (el && !params.el) params.el = el;
                if (params.el && dom(params.el).length > 1) {
                    const swipers = [];
                    dom(params.el).each((containerEl => {
                        const newParams = utils_extend({}, params, {
                            el: containerEl
                        });
                        swipers.push(new core_Swiper(newParams));
                    }));
                    return swipers;
                }
                const swiper = this;
                swiper.__swiper__ = true;
                swiper.support = getSupport();
                swiper.device = getDevice({
                    userAgent: params.userAgent
                });
                swiper.browser = getBrowser();
                swiper.eventsListeners = {};
                swiper.eventsAnyListeners = [];
                swiper.modules = [ ...swiper.__modules__ ];
                if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
                const allModulesParams = {};
                swiper.modules.forEach((mod => {
                    mod({
                        swiper,
                        extendParams: moduleExtendParams(params, allModulesParams),
                        on: swiper.on.bind(swiper),
                        once: swiper.once.bind(swiper),
                        off: swiper.off.bind(swiper),
                        emit: swiper.emit.bind(swiper)
                    });
                }));
                const swiperParams = utils_extend({}, defaults, allModulesParams);
                swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
                swiper.originalParams = utils_extend({}, swiper.params);
                swiper.passedParams = utils_extend({}, params);
                if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                    swiper.on(eventName, swiper.params.on[eventName]);
                }));
                if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
                swiper.$ = dom;
                Object.assign(swiper, {
                    enabled: swiper.params.enabled,
                    el,
                    classNames: [],
                    slides: dom(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal() {
                        return "horizontal" === swiper.params.direction;
                    },
                    isVertical() {
                        return "vertical" === swiper.params.direction;
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: true,
                    isEnd: false,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: false,
                    allowSlideNext: swiper.params.allowSlideNext,
                    allowSlidePrev: swiper.params.allowSlidePrev,
                    touchEvents: function touchEvents() {
                        const touch = [ "touchstart", "touchmove", "touchend", "touchcancel" ];
                        const desktop = [ "pointerdown", "pointermove", "pointerup" ];
                        swiper.touchEventsTouch = {
                            start: touch[0],
                            move: touch[1],
                            end: touch[2],
                            cancel: touch[3]
                        };
                        swiper.touchEventsDesktop = {
                            start: desktop[0],
                            move: desktop[1],
                            end: desktop[2]
                        };
                        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                    }(),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: swiper.params.focusableElements,
                        lastClickTime: utils_now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: true,
                    allowTouchMove: swiper.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                });
                swiper.emit("_swiper");
                if (swiper.params.init) swiper.init();
                return swiper;
            }
            enable() {
                const swiper = this;
                if (swiper.enabled) return;
                swiper.enabled = true;
                if (swiper.params.grabCursor) swiper.setGrabCursor();
                swiper.emit("enable");
            }
            disable() {
                const swiper = this;
                if (!swiper.enabled) return;
                swiper.enabled = false;
                if (swiper.params.grabCursor) swiper.unsetGrabCursor();
                swiper.emit("disable");
            }
            setProgress(progress, speed) {
                const swiper = this;
                progress = Math.min(Math.max(progress, 0), 1);
                const min = swiper.minTranslate();
                const max = swiper.maxTranslate();
                const current = (max - min) * progress + min;
                swiper.translateTo(current, "undefined" === typeof speed ? 0 : speed);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            emitContainerClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const cls = swiper.el.className.split(" ").filter((className => 0 === className.indexOf("swiper") || 0 === className.indexOf(swiper.params.containerModifierClass)));
                swiper.emit("_containerClasses", cls.join(" "));
            }
            getSlideClasses(slideEl) {
                const swiper = this;
                if (swiper.destroyed) return "";
                return slideEl.className.split(" ").filter((className => 0 === className.indexOf("swiper-slide") || 0 === className.indexOf(swiper.params.slideClass))).join(" ");
            }
            emitSlidesClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const updates = [];
                swiper.slides.each((slideEl => {
                    const classNames = swiper.getSlideClasses(slideEl);
                    updates.push({
                        slideEl,
                        classNames
                    });
                    swiper.emit("_slideClass", slideEl, classNames);
                }));
                swiper.emit("_slideClasses", updates);
            }
            slidesPerViewDynamic(view = "current", exact = false) {
                const swiper = this;
                const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
                let spv = 1;
                if (params.centeredSlides) {
                    let slideSize = slides[activeIndex].swiperSlideSize;
                    let breakLoop;
                    for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                    for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                } else if ("current" === view) for (let i = activeIndex + 1; i < slides.length; i += 1) {
                    const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                    if (slideInView) spv += 1;
                } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                    const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                    if (slideInView) spv += 1;
                }
                return spv;
            }
            update() {
                const swiper = this;
                if (!swiper || swiper.destroyed) return;
                const {snapGrid, params} = swiper;
                if (params.breakpoints) swiper.setBreakpoint();
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                function setTranslate() {
                    const translateValue = swiper.rtlTranslate ? -1 * swiper.translate : swiper.translate;
                    const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                    swiper.setTranslate(newTranslate);
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                }
                let translated;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                    setTranslate();
                    if (swiper.params.autoHeight) swiper.updateAutoHeight();
                } else {
                    if (("auto" === swiper.params.slidesPerView || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                    if (!translated) setTranslate();
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
                swiper.emit("update");
            }
            changeDirection(newDirection, needUpdate = true) {
                const swiper = this;
                const currentDirection = swiper.params.direction;
                if (!newDirection) newDirection = "horizontal" === currentDirection ? "vertical" : "horizontal";
                if (newDirection === currentDirection || "horizontal" !== newDirection && "vertical" !== newDirection) return swiper;
                swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
                swiper.emitContainerClasses();
                swiper.params.direction = newDirection;
                swiper.slides.each((slideEl => {
                    if ("vertical" === newDirection) slideEl.style.width = ""; else slideEl.style.height = "";
                }));
                swiper.emit("changeDirection");
                if (needUpdate) swiper.update();
                return swiper;
            }
            changeLanguageDirection(direction) {
                const swiper = this;
                if (swiper.rtl && "rtl" === direction || !swiper.rtl && "ltr" === direction) return;
                swiper.rtl = "rtl" === direction;
                swiper.rtlTranslate = "horizontal" === swiper.params.direction && swiper.rtl;
                if (swiper.rtl) {
                    swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "rtl";
                } else {
                    swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "ltr";
                }
                swiper.update();
            }
            mount(el) {
                const swiper = this;
                if (swiper.mounted) return true;
                const $el = dom(el || swiper.params.el);
                el = $el[0];
                if (!el) return false;
                el.swiper = swiper;
                const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
                const getWrapper = () => {
                    if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                        const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
                        res.children = options => $el.children(options);
                        return res;
                    }
                    if (!$el.children) return dom($el).children(getWrapperSelector());
                    return $el.children(getWrapperSelector());
                };
                let $wrapperEl = getWrapper();
                if (0 === $wrapperEl.length && swiper.params.createElements) {
                    const document = ssr_window_esm_getDocument();
                    const wrapper = document.createElement("div");
                    $wrapperEl = dom(wrapper);
                    wrapper.className = swiper.params.wrapperClass;
                    $el.append(wrapper);
                    $el.children(`.${swiper.params.slideClass}`).each((slideEl => {
                        $wrapperEl.append(slideEl);
                    }));
                }
                Object.assign(swiper, {
                    $el,
                    el,
                    $wrapperEl,
                    wrapperEl: $wrapperEl[0],
                    mounted: true,
                    rtl: "rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction"),
                    rtlTranslate: "horizontal" === swiper.params.direction && ("rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction")),
                    wrongRTL: "-webkit-box" === $wrapperEl.css("display")
                });
                return true;
            }
            init(el) {
                const swiper = this;
                if (swiper.initialized) return swiper;
                const mounted = swiper.mount(el);
                if (false === mounted) return swiper;
                swiper.emit("beforeInit");
                if (swiper.params.breakpoints) swiper.setBreakpoint();
                swiper.addClasses();
                if (swiper.params.loop) swiper.loopCreate();
                swiper.updateSize();
                swiper.updateSlides();
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
                if (swiper.params.preloadImages) swiper.preloadImages();
                if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                swiper.attachEvents();
                swiper.initialized = true;
                swiper.emit("init");
                swiper.emit("afterInit");
                return swiper;
            }
            destroy(deleteInstance = true, cleanStyles = true) {
                const swiper = this;
                const {params, $el, $wrapperEl, slides} = swiper;
                if ("undefined" === typeof swiper.params || swiper.destroyed) return null;
                swiper.emit("beforeDestroy");
                swiper.initialized = false;
                swiper.detachEvents();
                if (params.loop) swiper.loopDestroy();
                if (cleanStyles) {
                    swiper.removeClasses();
                    $el.removeAttr("style");
                    $wrapperEl.removeAttr("style");
                    if (slides && slides.length) slides.removeClass([ params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
                }
                swiper.emit("destroy");
                Object.keys(swiper.eventsListeners).forEach((eventName => {
                    swiper.off(eventName);
                }));
                if (false !== deleteInstance) {
                    swiper.$el[0].swiper = null;
                    deleteProps(swiper);
                }
                swiper.destroyed = true;
                return null;
            }
            static extendDefaults(newDefaults) {
                utils_extend(extendedDefaults, newDefaults);
            }
            static get extendedDefaults() {
                return extendedDefaults;
            }
            static get defaults() {
                return defaults;
            }
            static installModule(mod) {
                if (!core_Swiper.prototype.__modules__) core_Swiper.prototype.__modules__ = [];
                const modules = core_Swiper.prototype.__modules__;
                if ("function" === typeof mod && modules.indexOf(mod) < 0) modules.push(mod);
            }
            static use(module) {
                if (Array.isArray(module)) {
                    module.forEach((m => core_Swiper.installModule(m)));
                    return core_Swiper;
                }
                core_Swiper.installModule(module);
                return core_Swiper;
            }
        }
        Object.keys(prototypes).forEach((prototypeGroup => {
            Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
                core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }));
        }));
        core_Swiper.use([ Resize, Observer ]);
        const core = core_Swiper;
        function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
            const document = ssr_window_esm_getDocument();
            if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
                if (!params[key] && true === params.auto) {
                    let element = swiper.$el.children(`.${checkProps[key]}`)[0];
                    if (!element) {
                        element = document.createElement("div");
                        element.className = checkProps[key];
                        swiper.$el.append(element);
                    }
                    params[key] = element;
                    originalParams[key] = element;
                }
            }));
            return params;
        }
        function Navigation({swiper, extendParams, on, emit}) {
            extendParams({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: false,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock",
                    navigationDisabledClass: "swiper-navigation-disabled"
                }
            });
            swiper.navigation = {
                nextEl: null,
                $nextEl: null,
                prevEl: null,
                $prevEl: null
            };
            function getEl(el) {
                let $el;
                if (el) {
                    $el = dom(el);
                    if (swiper.params.uniqueNavElements && "string" === typeof el && $el.length > 1 && 1 === swiper.$el.find(el).length) $el = swiper.$el.find(el);
                }
                return $el;
            }
            function toggleEl($el, disabled) {
                const params = swiper.params.navigation;
                if ($el && $el.length > 0) {
                    $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
                    if ($el[0] && "BUTTON" === $el[0].tagName) $el[0].disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
                }
            }
            function update() {
                if (swiper.params.loop) return;
                const {$nextEl, $prevEl} = swiper.navigation;
                toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
                toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
            }
            function onPrevClick(e) {
                e.preventDefault();
                if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slidePrev();
                emit("navigationPrev");
            }
            function onNextClick(e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slideNext();
                emit("navigationNext");
            }
            function init() {
                const params = swiper.params.navigation;
                swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                });
                if (!(params.nextEl || params.prevEl)) return;
                const $nextEl = getEl(params.nextEl);
                const $prevEl = getEl(params.prevEl);
                if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
                if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
                Object.assign(swiper.navigation, {
                    $nextEl,
                    nextEl: $nextEl && $nextEl[0],
                    $prevEl,
                    prevEl: $prevEl && $prevEl[0]
                });
                if (!swiper.enabled) {
                    if ($nextEl) $nextEl.addClass(params.lockClass);
                    if ($prevEl) $prevEl.addClass(params.lockClass);
                }
            }
            function destroy() {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl && $nextEl.length) {
                    $nextEl.off("click", onNextClick);
                    $nextEl.removeClass(swiper.params.navigation.disabledClass);
                }
                if ($prevEl && $prevEl.length) {
                    $prevEl.off("click", onPrevClick);
                    $prevEl.removeClass(swiper.params.navigation.disabledClass);
                }
            }
            on("init", (() => {
                if (false === swiper.params.navigation.enabled) disable(); else {
                    init();
                    update();
                }
            }));
            on("toEdge fromEdge lock unlock", (() => {
                update();
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
                if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
            }));
            on("click", ((_s, e) => {
                const {$nextEl, $prevEl} = swiper.navigation;
                const targetEl = e.target;
                if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
                    if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                    let isHidden;
                    if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
                    if (true === isHidden) emit("navigationShow"); else emit("navigationHide");
                    if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                    if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
                }
            }));
            const enable = () => {
                swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
                init();
                update();
            };
            const disable = () => {
                swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
                destroy();
            };
            Object.assign(swiper.navigation, {
                enable,
                disable,
                update,
                init,
                destroy
            });
        }
        function classes_to_selector_classesToSelector(classes = "") {
            return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
        }
        function Pagination({swiper, extendParams, on, emit}) {
            const pfx = "swiper-pagination";
            extendParams({
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: false,
                    hideOnClick: false,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: false,
                    type: "bullets",
                    dynamicBullets: false,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: number => number,
                    formatFractionTotal: number => number,
                    bulletClass: `${pfx}-bullet`,
                    bulletActiveClass: `${pfx}-bullet-active`,
                    modifierClass: `${pfx}-`,
                    currentClass: `${pfx}-current`,
                    totalClass: `${pfx}-total`,
                    hiddenClass: `${pfx}-hidden`,
                    progressbarFillClass: `${pfx}-progressbar-fill`,
                    progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                    clickableClass: `${pfx}-clickable`,
                    lockClass: `${pfx}-lock`,
                    horizontalClass: `${pfx}-horizontal`,
                    verticalClass: `${pfx}-vertical`,
                    paginationDisabledClass: `${pfx}-disabled`
                }
            });
            swiper.pagination = {
                el: null,
                $el: null,
                bullets: []
            };
            let bulletSize;
            let dynamicBulletIndex = 0;
            function isPaginationDisabled() {
                return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || 0 === swiper.pagination.$el.length;
            }
            function setSideBullets($bulletEl, position) {
                const {bulletActiveClass} = swiper.params.pagination;
                $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
            }
            function update() {
                const rtl = swiper.rtl;
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let current;
                const total = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.loop) {
                    current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
                    if (current > slidesLength - 1 - 2 * swiper.loopedSlides) current -= slidesLength - 2 * swiper.loopedSlides;
                    if (current > total - 1) current -= total;
                    if (current < 0 && "bullets" !== swiper.params.paginationType) current = total + current;
                } else if ("undefined" !== typeof swiper.snapIndex) current = swiper.snapIndex; else current = swiper.activeIndex || 0;
                if ("bullets" === params.type && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                    const bullets = swiper.pagination.bullets;
                    let firstIndex;
                    let lastIndex;
                    let midIndex;
                    if (params.dynamicBullets) {
                        bulletSize = bullets.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
                        $el.css(swiper.isHorizontal() ? "width" : "height", `${bulletSize * (params.dynamicMainBullets + 4)}px`);
                        if (params.dynamicMainBullets > 1 && void 0 !== swiper.previousIndex) {
                            dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
                            if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                        }
                        firstIndex = Math.max(current - dynamicBulletIndex, 0);
                        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                        midIndex = (lastIndex + firstIndex) / 2;
                    }
                    bullets.removeClass([ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)).join(" "));
                    if ($el.length > 1) bullets.each((bullet => {
                        const $bullet = dom(bullet);
                        const bulletIndex = $bullet.index();
                        if (bulletIndex === current) $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) $bullet.addClass(`${params.bulletActiveClass}-main`);
                            if (bulletIndex === firstIndex) setSideBullets($bullet, "prev");
                            if (bulletIndex === lastIndex) setSideBullets($bullet, "next");
                        }
                    })); else {
                        const $bullet = bullets.eq(current);
                        const bulletIndex = $bullet.index();
                        $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            const $firstDisplayedBullet = bullets.eq(firstIndex);
                            const $lastDisplayedBullet = bullets.eq(lastIndex);
                            for (let i = firstIndex; i <= lastIndex; i += 1) bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
                            if (swiper.params.loop) if (bulletIndex >= bullets.length) {
                                for (let i = params.dynamicMainBullets; i >= 0; i -= 1) bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                                bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            }
                        }
                    }
                    if (params.dynamicBullets) {
                        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                        const offsetProp = rtl ? "right" : "left";
                        bullets.css(swiper.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
                    }
                }
                if ("fraction" === params.type) {
                    $el.find(classes_to_selector_classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
                    $el.find(classes_to_selector_classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
                }
                if ("progressbar" === params.type) {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if ("horizontal" === progressbarDirection) scaleX = scale; else scaleY = scale;
                    $el.find(classes_to_selector_classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
                }
                if ("custom" === params.type && params.renderCustom) {
                    $el.html(params.renderCustom(swiper, current + 1, total));
                    emit("paginationRender", $el[0]);
                } else emit("paginationUpdate", $el[0]);
                if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
            }
            function render() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let paginationHTML = "";
                if ("bullets" === params.type) {
                    let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                    if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                    for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
                    $el.html(paginationHTML);
                    swiper.pagination.bullets = $el.find(classes_to_selector_classesToSelector(params.bulletClass));
                }
                if ("fraction" === params.type) {
                    if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("progressbar" === params.type) {
                    if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("custom" !== params.type) emit("paginationRender", swiper.pagination.$el[0]);
            }
            function init() {
                swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                    el: "swiper-pagination"
                });
                const params = swiper.params.pagination;
                if (!params.el) return;
                let $el = dom(params.el);
                if (0 === $el.length) return;
                if (swiper.params.uniqueNavElements && "string" === typeof params.el && $el.length > 1) {
                    $el = swiper.$el.find(params.el);
                    if ($el.length > 1) $el = $el.filter((el => {
                        if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
                        return true;
                    }));
                }
                if ("bullets" === params.type && params.clickable) $el.addClass(params.clickableClass);
                $el.addClass(params.modifierClass + params.type);
                $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if ("bullets" === params.type && params.dynamicBullets) {
                    $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if ("progressbar" === params.type && params.progressbarOpposite) $el.addClass(params.progressbarOppositeClass);
                if (params.clickable) $el.on("click", classes_to_selector_classesToSelector(params.bulletClass), (function onClick(e) {
                    e.preventDefault();
                    let index = dom(this).index() * swiper.params.slidesPerGroup;
                    if (swiper.params.loop) index += swiper.loopedSlides;
                    swiper.slideTo(index);
                }));
                Object.assign(swiper.pagination, {
                    $el,
                    el: $el[0]
                });
                if (!swiper.enabled) $el.addClass(params.lockClass);
            }
            function destroy() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const $el = swiper.pagination.$el;
                $el.removeClass(params.hiddenClass);
                $el.removeClass(params.modifierClass + params.type);
                $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
                if (params.clickable) $el.off("click", classes_to_selector_classesToSelector(params.bulletClass));
            }
            on("init", (() => {
                if (false === swiper.params.pagination.enabled) disable(); else {
                    init();
                    render();
                    update();
                }
            }));
            on("activeIndexChange", (() => {
                if (swiper.params.loop) update(); else if ("undefined" === typeof swiper.snapIndex) update();
            }));
            on("snapIndexChange", (() => {
                if (!swiper.params.loop) update();
            }));
            on("slidesLengthChange", (() => {
                if (swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("snapGridLengthChange", (() => {
                if (!swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$el} = swiper.pagination;
                if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
            }));
            on("lock unlock", (() => {
                update();
            }));
            on("click", ((_s, e) => {
                const targetEl = e.target;
                const {$el} = swiper.pagination;
                if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el && $el.length > 0 && !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
                    if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                    const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
                    if (true === isHidden) emit("paginationShow"); else emit("paginationHide");
                    $el.toggleClass(swiper.params.pagination.hiddenClass);
                }
            }));
            const enable = () => {
                swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
                if (swiper.pagination.$el) swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
                init();
                render();
                update();
            };
            const disable = () => {
                swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);
                if (swiper.pagination.$el) swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);
                destroy();
            };
            Object.assign(swiper.pagination, {
                enable,
                disable,
                render,
                update,
                init,
                destroy
            });
        }
        function Controller({swiper, extendParams, on}) {
            extendParams({
                controller: {
                    control: void 0,
                    inverse: false,
                    by: "slide"
                }
            });
            swiper.controller = {
                control: void 0
            };
            function LinearSpline(x, y) {
                const binarySearch = function search() {
                    let maxIndex;
                    let minIndex;
                    let guess;
                    return (array, val) => {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1) {
                            guess = maxIndex + minIndex >> 1;
                            if (array[guess] <= val) minIndex = guess; else maxIndex = guess;
                        }
                        return maxIndex;
                    };
                }();
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                let i1;
                let i3;
                this.interpolate = function interpolate(x2) {
                    if (!x2) return 0;
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
                    return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
                return this;
            }
            function getInterpolateFunction(c) {
                if (!swiper.controller.spline) swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
            }
            function setTranslate(_t, byController) {
                const controlled = swiper.controller.control;
                let multiplier;
                let controlledTranslate;
                const Swiper = swiper.constructor;
                function setControlledTranslate(c) {
                    const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
                    if ("slide" === swiper.params.controller.by) {
                        getInterpolateFunction(c);
                        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
                    }
                    if (!controlledTranslate || "container" === swiper.params.controller.by) {
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
                        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
                    }
                    if (swiper.params.controller.inverse) controlledTranslate = c.maxTranslate() - controlledTranslate;
                    c.updateProgress(controlledTranslate);
                    c.setTranslate(controlledTranslate, swiper);
                    c.updateActiveIndex();
                    c.updateSlidesClasses();
                }
                if (Array.isArray(controlled)) {
                    for (let i = 0; i < controlled.length; i += 1) if (controlled[i] !== byController && controlled[i] instanceof Swiper) setControlledTranslate(controlled[i]);
                } else if (controlled instanceof Swiper && byController !== controlled) setControlledTranslate(controlled);
            }
            function setTransition(duration, byController) {
                const Swiper = swiper.constructor;
                const controlled = swiper.controller.control;
                let i;
                function setControlledTransition(c) {
                    c.setTransition(duration, swiper);
                    if (0 !== duration) {
                        c.transitionStart();
                        if (c.params.autoHeight) utils_nextTick((() => {
                            c.updateAutoHeight();
                        }));
                        c.$wrapperEl.transitionEnd((() => {
                            if (!controlled) return;
                            if (c.params.loop && "slide" === swiper.params.controller.by) c.loopFix();
                            c.transitionEnd();
                        }));
                    }
                }
                if (Array.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i += 1) if (controlled[i] !== byController && controlled[i] instanceof Swiper) setControlledTransition(controlled[i]);
                } else if (controlled instanceof Swiper && byController !== controlled) setControlledTransition(controlled);
            }
            function removeSpline() {
                if (!swiper.controller.control) return;
                if (swiper.controller.spline) {
                    swiper.controller.spline = void 0;
                    delete swiper.controller.spline;
                }
            }
            on("beforeInit", (() => {
                swiper.controller.control = swiper.params.controller.control;
            }));
            on("update", (() => {
                removeSpline();
            }));
            on("resize", (() => {
                removeSpline();
            }));
            on("observerUpdate", (() => {
                removeSpline();
            }));
            on("setTranslate", ((_s, translate, byController) => {
                if (!swiper.controller.control) return;
                swiper.controller.setTranslate(translate, byController);
            }));
            on("setTransition", ((_s, duration, byController) => {
                if (!swiper.controller.control) return;
                swiper.controller.setTransition(duration, byController);
            }));
            Object.assign(swiper.controller, {
                setTranslate,
                setTransition
            });
        }
        function Autoplay({swiper, extendParams, on, emit}) {
            let timeout;
            swiper.autoplay = {
                running: false,
                paused: false
            };
            extendParams({
                autoplay: {
                    enabled: false,
                    delay: 3e3,
                    waitForTransition: true,
                    disableOnInteraction: true,
                    stopOnLastSlide: false,
                    reverseDirection: false,
                    pauseOnMouseEnter: false
                }
            });
            function run() {
                if (!swiper.size) {
                    swiper.autoplay.running = false;
                    swiper.autoplay.paused = false;
                    return;
                }
                const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
                let delay = swiper.params.autoplay.delay;
                if ($activeSlideEl.attr("data-swiper-autoplay")) delay = $activeSlideEl.attr("data-swiper-autoplay") || swiper.params.autoplay.delay;
                clearTimeout(timeout);
                timeout = utils_nextTick((() => {
                    let autoplayResult;
                    if (swiper.params.autoplay.reverseDirection) if (swiper.params.loop) {
                        swiper.loopFix();
                        autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.isBeginning) {
                        autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
                        emit("autoplay");
                    } else stop(); else if (swiper.params.loop) {
                        swiper.loopFix();
                        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.isEnd) {
                        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
                        emit("autoplay");
                    } else stop();
                    if (swiper.params.cssMode && swiper.autoplay.running) run(); else if (false === autoplayResult) run();
                }), delay);
            }
            function start() {
                if ("undefined" !== typeof timeout) return false;
                if (swiper.autoplay.running) return false;
                swiper.autoplay.running = true;
                emit("autoplayStart");
                run();
                return true;
            }
            function stop() {
                if (!swiper.autoplay.running) return false;
                if ("undefined" === typeof timeout) return false;
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = void 0;
                }
                swiper.autoplay.running = false;
                emit("autoplayStop");
                return true;
            }
            function pause(speed) {
                if (!swiper.autoplay.running) return;
                if (swiper.autoplay.paused) return;
                if (timeout) clearTimeout(timeout);
                swiper.autoplay.paused = true;
                if (0 === speed || !swiper.params.autoplay.waitForTransition) {
                    swiper.autoplay.paused = false;
                    run();
                } else [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
                }));
            }
            function onVisibilityChange() {
                const document = ssr_window_esm_getDocument();
                if ("hidden" === document.visibilityState && swiper.autoplay.running) pause();
                if ("visible" === document.visibilityState && swiper.autoplay.paused) {
                    run();
                    swiper.autoplay.paused = false;
                }
            }
            function onTransitionEnd(e) {
                if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
                if (e.target !== swiper.$wrapperEl[0]) return;
                [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
                }));
                swiper.autoplay.paused = false;
                if (!swiper.autoplay.running) stop(); else run();
            }
            function onMouseEnter() {
                if (swiper.params.autoplay.disableOnInteraction) stop(); else {
                    emit("autoplayPause");
                    pause();
                }
                [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
                }));
            }
            function onMouseLeave() {
                if (swiper.params.autoplay.disableOnInteraction) return;
                swiper.autoplay.paused = false;
                emit("autoplayResume");
                run();
            }
            function attachMouseEvents() {
                if (swiper.params.autoplay.pauseOnMouseEnter) {
                    swiper.$el.on("mouseenter", onMouseEnter);
                    swiper.$el.on("mouseleave", onMouseLeave);
                }
            }
            function detachMouseEvents() {
                swiper.$el.off("mouseenter", onMouseEnter);
                swiper.$el.off("mouseleave", onMouseLeave);
            }
            on("init", (() => {
                if (swiper.params.autoplay.enabled) {
                    start();
                    const document = ssr_window_esm_getDocument();
                    document.addEventListener("visibilitychange", onVisibilityChange);
                    attachMouseEvents();
                }
            }));
            on("beforeTransitionStart", ((_s, speed, internal) => {
                if (swiper.autoplay.running) if (internal || !swiper.params.autoplay.disableOnInteraction) swiper.autoplay.pause(speed); else stop();
            }));
            on("sliderFirstMove", (() => {
                if (swiper.autoplay.running) if (swiper.params.autoplay.disableOnInteraction) stop(); else pause();
            }));
            on("touchEnd", (() => {
                if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) run();
            }));
            on("destroy", (() => {
                detachMouseEvents();
                if (swiper.autoplay.running) stop();
                const document = ssr_window_esm_getDocument();
                document.removeEventListener("visibilitychange", onVisibilityChange);
            }));
            Object.assign(swiper.autoplay, {
                pause,
                run,
                start,
                stop
            });
        }
        function Thumb({swiper, extendParams, on}) {
            extendParams({
                thumbs: {
                    swiper: null,
                    multipleActiveThumbs: true,
                    autoScrollOffset: 0,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-thumbs"
                }
            });
            let initialized = false;
            let swiperCreated = false;
            swiper.thumbs = {
                swiper: null
            };
            function onThumbClick() {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper || thumbsSwiper.destroyed) return;
                const clickedIndex = thumbsSwiper.clickedIndex;
                const clickedSlide = thumbsSwiper.clickedSlide;
                if (clickedSlide && dom(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
                if ("undefined" === typeof clickedIndex || null === clickedIndex) return;
                let slideToIndex;
                if (thumbsSwiper.params.loop) slideToIndex = parseInt(dom(thumbsSwiper.clickedSlide).attr("data-swiper-slide-index"), 10); else slideToIndex = clickedIndex;
                if (swiper.params.loop) {
                    let currentIndex = swiper.activeIndex;
                    if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
                        swiper.loopFix();
                        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
                        currentIndex = swiper.activeIndex;
                    }
                    const prevIndex = swiper.slides.eq(currentIndex).prevAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
                    const nextIndex = swiper.slides.eq(currentIndex).nextAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
                    if ("undefined" === typeof prevIndex) slideToIndex = nextIndex; else if ("undefined" === typeof nextIndex) slideToIndex = prevIndex; else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex; else slideToIndex = prevIndex;
                }
                swiper.slideTo(slideToIndex);
            }
            function init() {
                const {thumbs: thumbsParams} = swiper.params;
                if (initialized) return false;
                initialized = true;
                const SwiperClass = swiper.constructor;
                if (thumbsParams.swiper instanceof SwiperClass) {
                    swiper.thumbs.swiper = thumbsParams.swiper;
                    Object.assign(swiper.thumbs.swiper.originalParams, {
                        watchSlidesProgress: true,
                        slideToClickedSlide: false
                    });
                    Object.assign(swiper.thumbs.swiper.params, {
                        watchSlidesProgress: true,
                        slideToClickedSlide: false
                    });
                } else if (utils_isObject(thumbsParams.swiper)) {
                    const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
                    Object.assign(thumbsSwiperParams, {
                        watchSlidesProgress: true,
                        slideToClickedSlide: false
                    });
                    swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
                    swiperCreated = true;
                }
                swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
                swiper.thumbs.swiper.on("tap", onThumbClick);
                return true;
            }
            function update(initial) {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper || thumbsSwiper.destroyed) return;
                const slidesPerView = "auto" === thumbsSwiper.params.slidesPerView ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
                let thumbsToActivate = 1;
                const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
                if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) thumbsToActivate = swiper.params.slidesPerView;
                if (!swiper.params.thumbs.multipleActiveThumbs) thumbsToActivate = 1;
                thumbsToActivate = Math.floor(thumbsToActivate);
                thumbsSwiper.slides.removeClass(thumbActiveClass);
                if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) for (let i = 0; i < thumbsToActivate; i += 1) thumbsSwiper.$wrapperEl.children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`).addClass(thumbActiveClass); else for (let i = 0; i < thumbsToActivate; i += 1) thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
                const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
                const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
                if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
                    let currentThumbsIndex = thumbsSwiper.activeIndex;
                    let newThumbsIndex;
                    let direction;
                    if (thumbsSwiper.params.loop) {
                        if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
                            thumbsSwiper.loopFix();
                            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
                            currentThumbsIndex = thumbsSwiper.activeIndex;
                        }
                        const prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
                        const nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
                        if ("undefined" === typeof prevThumbsIndex) newThumbsIndex = nextThumbsIndex; else if ("undefined" === typeof nextThumbsIndex) newThumbsIndex = prevThumbsIndex; else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex; else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) newThumbsIndex = nextThumbsIndex; else newThumbsIndex = prevThumbsIndex;
                        direction = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
                    } else {
                        newThumbsIndex = swiper.realIndex;
                        direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
                    }
                    if (useOffset) newThumbsIndex += "next" === direction ? autoScrollOffset : -1 * autoScrollOffset;
                    if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
                        if (thumbsSwiper.params.centeredSlides) if (newThumbsIndex > currentThumbsIndex) newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1; else newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1; else if (newThumbsIndex > currentThumbsIndex && 1 === thumbsSwiper.params.slidesPerGroup) ;
                        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : void 0);
                    }
                }
            }
            on("beforeInit", (() => {
                const {thumbs} = swiper.params;
                if (!thumbs || !thumbs.swiper) return;
                init();
                update(true);
            }));
            on("slideChange update resize observerUpdate", (() => {
                update();
            }));
            on("setTransition", ((_s, duration) => {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper || thumbsSwiper.destroyed) return;
                thumbsSwiper.setTransition(duration);
            }));
            on("beforeDestroy", (() => {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper || thumbsSwiper.destroyed) return;
                if (swiperCreated) thumbsSwiper.destroy();
            }));
            Object.assign(swiper.thumbs, {
                init,
                update
            });
        }
        function initSliders() {
            if (document.querySelector(".overviews-slider__body")) new core(".overviews-slider__body", {
                modules: [ Navigation, Pagination ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 32,
                watchOverflow: false,
                loop: true,
                loopAdditionalSlides: 5,
                preloadImages: false,
                speed: 800,
                navigation: {
                    prevEl: ".overviews-slider .slider-arrow_prev",
                    nextEl: ".overviews-slider .slider-arrow_next"
                },
                breakpoints: {
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    }
                }
            });
            if (document.querySelector(".lead__body")) new core(".lead__body", {
                modules: [ Pagination, Navigation ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 20,
                watchOverflow: false,
                loop: true,
                loopAdditionalSlides: 5,
                preloadImages: false,
                speed: 800,
                navigation: {
                    prevEl: ".lead .slider-arrow_prev",
                    nextEl: ".lead .slider-arrow_next"
                },
                pagination: {
                    el: ".lead__pagination",
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    991.98: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }
            });
            if (document.querySelector(".gallery-interier__content")) new core(".gallery-interier__content", {
                modules: [ Navigation, Pagination ],
                spaceBetween: 10,
                loop: true,
                watchOverflow: true,
                observer: true,
                observeParents: true,
                speed: 800,
                navigation: {
                    nextEl: ".gallery-interier__content .slider-arrow_next",
                    prevEl: ".gallery-interier__content .slider-arrow_prev"
                }
            });
            if (document.querySelector(".gallery-exterier__content")) new core(".gallery-exterier__content", {
                modules: [ Navigation, Pagination ],
                spaceBetween: 10,
                loop: true,
                watchOverflow: true,
                speed: 800,
                navigation: {
                    nextEl: ".gallery-exterier__content .slider-arrow_next",
                    prevEl: ".gallery-exterier__content .slider-arrow_prev"
                }
            });
            if (document.querySelector(".bedroom-tabs__content")) new core(".bedroom-tabs__content", {
                modules: [ Navigation, Pagination ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 20,
                watchOverflow: false,
                loop: true,
                preloadImages: false,
                speed: 800,
                navigation: {
                    prevEl: ".bedroom-tabs__content .slider-arrow_prev",
                    nextEl: ".bedroom-tabs__content .slider-arrow_next"
                },
                pagination: {
                    el: ".bedroom-tabs__content .bedroom-tabs-pagination",
                    clickable: true,
                    renderBullet: function(index, className) {
                        const bedroomBullet = this.pagination.el.dataset.pagination.split(",");
                        return `\n\t\t\t\t\t\t<span class="${className} bedroom-tabs-pagination__item">${bedroomBullet[index].trim()}</span>\n\t\t\t\t\t`;
                    }
                }
            });
            if (document.querySelector(".trusted-slider__body")) new core(".trusted-slider__body", {
                modules: [ Navigation, Pagination ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 20,
                watchOverflow: false,
                loop: true,
                preloadImages: false,
                speed: 800,
                navigation: {
                    prevEl: ".trusted-slider__body .slider-arrow_prev",
                    nextEl: ".trusted-slider__body .slider-arrow_next"
                },
                pagination: {
                    el: ".trusted-slider__body .trusted-slider__pagination",
                    clickable: true
                }
            });
            if (document.querySelector(".page-area__body")) new core(".page-area__body", {
                modules: [ Navigation, Pagination ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 20,
                watchOverflow: false,
                loop: true,
                preloadImages: false,
                speed: 800,
                navigation: {
                    prevEl: ".page-area__body .slider-arrow_prev",
                    nextEl: ".page-area__body .slider-arrow_next"
                },
                pagination: {
                    el: ".page-area__body .trusted-slider__pagination",
                    clickable: true
                }
            });
            if (document.querySelector(".news__body")) new core(".news__body", {
                modules: [ Pagination, Navigation ],
                observer: true,
                observeParents: true,
                slidesPerView: 2,
                spaceBetween: 20,
                watchOverflow: true,
                loop: true,
                loopAdditionalSlides: 2,
                preloadImages: false,
                speed: 800,
                navigation: {
                    prevEl: ".news__body .slider-arrow_prev",
                    nextEl: ".news__body .slider-arrow_next"
                },
                pagination: {
                    el: ".news__pagination",
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    991.98: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                }
            });
            if (document.querySelector(".banner__body")) new core(".banner__body", {
                modules: [ Pagination, Navigation, Autoplay ],
                autoplay: {
                    delay: 5e3,
                    disableOnInteraction: false
                },
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 20,
                watchOverflow: false,
                loop: true,
                loopAdditionalSlides: 2,
                preloadImages: false,
                speed: 800,
                pagination: {
                    el: ".banner__pagination",
                    clickable: true
                }
            });
            if (document.querySelector(".developers__body")) new core(".developers__body", {
                modules: [ Pagination, Navigation ],
                observer: true,
                observeParents: true,
                slidesPerView: 3,
                spaceBetween: 20,
                watchOverflow: true,
                loop: true,
                loopAdditionalSlides: 2,
                preloadImages: false,
                speed: 800,
                pagination: {
                    el: ".developers__pagination",
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    767.98: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    991.98: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }
            });
            if (document.querySelector(".main-developer__slider-body")) {
                const thumbs = new core(".main-developer__thumbs", {
                    modules: [ Pagination, Navigation, Thumb ],
                    spaceBetween: 10,
                    slidesPerView: 2,
                    freeMode: true,
                    watchSlidesProgress: true,
                    breakpoints: {
                        767.98: {
                            slidesPerView: 3
                        }
                    }
                });
                new core(".main-developer__slider-body", {
                    modules: [ Pagination, Navigation, Thumb ],
                    spaceBetween: 20,
                    navigation: {
                        nextEl: ".main-developer__slider-body .main-developer__right",
                        prevEl: ".main-developer__slider-body .main-developer__left"
                    },
                    thumbs: {
                        swiper: thumbs
                    }
                });
            }
            if (document.querySelector(".google-reviews__reviews")) new core(".google-reviews__reviews", {
                modules: [ Navigation ],
                observer: true,
                observeParents: true,
                watchOverflow: false,
                preloadImages: false,
                speed: 800,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    479.98: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    991.98: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }
            });
            if (document.querySelector(".index-news__body")) new core(".index-news__body", {
                modules: [ Navigation, Pagination ],
                observer: true,
                spaceBetween: 8,
                observeParents: true,
                watchOverflow: true,
                loopAdditionalSlides: 30,
                roundLengths: true,
                speed: 800,
                pagination: {
                    el: ".index-news__pagination",
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    767.98: {
                        slidesPerView: 2
                    },
                    991.98: {
                        slidesPerView: 3
                    }
                }
            });
            if (document.querySelector(".hot-project-images__body")) {
                const projectImages = document.querySelectorAll(".hot-project-images__body");
                if (projectImages.length) projectImages.forEach((item => {
                    new core(item, {
                        modules: [ Navigation, Pagination, Controller ],
                        slidesPerView: 1,
                        observer: true,
                        observeParents: true,
                        watchOverflow: true,
                        speed: 800,
                        pagination: {
                            el: ".hot-project-images__pagination",
                            clickable: true
                        }
                    });
                }));
            }
            if (document.querySelector(".hot-project__body")) new core(".hot-project__body", {
                modules: [ Navigation, Pagination, Autoplay ],
                observer: true,
                observeParents: true,
                watchOverflow: true,
                speed: 800,
                spaceBetween: 10,
                autoplay: {
                    delay: 2500
                },
                pagination: {
                    el: ".hot-project__pagination",
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    767.98: {
                        slidesPerView: 2
                    },
                    991.98: {
                        slidesPerView: 3
                    }
                }
            });
        }
        window.addEventListener("load", (function(e) {
            initSliders();
        }));
        var lazyload_min = __webpack_require__(732);
        new lazyload_min({
            elements_selector: "[data-src],[data-srcset]",
            class_loaded: "_lazy-loaded",
            use_native: true
        });
        let addWindowScrollEvent = false;
        function headerScroll() {
            addWindowScrollEvent = true;
            const header = document.querySelector("header.header") ?? document.querySelector("header.header-index");
            const headerShow = header.hasAttribute("data-scroll-show");
            const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
            const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
            let scrollDirection = 0;
            let timer;
            document.addEventListener("windowScroll", (function(e) {
                const scrollTop = window.scrollY;
                clearTimeout(timer);
                if (scrollTop >= startPoint) {
                    !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                    if (headerShow) {
                        if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        timer = setTimeout((() => {
                            !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        }), headerShowTimer);
                    }
                } else {
                    header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                    if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
                }
                scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
            }));
        }
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        /*!
 * lightgallery | 2.7.1 | January 11th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        var __assign = function() {
            __assign = Object.assign || function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        function __spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
            var r = Array(s), k = 0;
            for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
            k++) r[k] = a[j];
            return r;
        }
        var lGEvents = {
            afterAppendSlide: "lgAfterAppendSlide",
            init: "lgInit",
            hasVideo: "lgHasVideo",
            containerResize: "lgContainerResize",
            updateSlides: "lgUpdateSlides",
            afterAppendSubHtml: "lgAfterAppendSubHtml",
            beforeOpen: "lgBeforeOpen",
            afterOpen: "lgAfterOpen",
            slideItemLoad: "lgSlideItemLoad",
            beforeSlide: "lgBeforeSlide",
            afterSlide: "lgAfterSlide",
            posterClick: "lgPosterClick",
            dragStart: "lgDragStart",
            dragMove: "lgDragMove",
            dragEnd: "lgDragEnd",
            beforeNextSlide: "lgBeforeNextSlide",
            beforePrevSlide: "lgBeforePrevSlide",
            beforeClose: "lgBeforeClose",
            afterClose: "lgAfterClose",
            rotateLeft: "lgRotateLeft",
            rotateRight: "lgRotateRight",
            flipHorizontal: "lgFlipHorizontal",
            flipVertical: "lgFlipVertical",
            autoplay: "lgAutoplay",
            autoplayStart: "lgAutoplayStart",
            autoplayStop: "lgAutoplayStop"
        };
        var lightGalleryCoreSettings = {
            mode: "lg-slide",
            easing: "ease",
            speed: 400,
            licenseKey: "0000-0000-000-0000",
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 300,
            container: "",
            startAnimationDuration: 400,
            zoomFromOrigin: true,
            hideBarsDelay: 0,
            showBarsAfter: 1e4,
            slideDelay: 0,
            supportLegacyBrowser: true,
            allowMediaOverlap: false,
            videoMaxSize: "1280-720",
            loadYouTubePoster: true,
            defaultCaptionHeight: 0,
            ariaLabelledby: "",
            ariaDescribedby: "",
            resetScrollPosition: true,
            hideScrollbar: false,
            closable: true,
            swipeToClose: true,
            closeOnTap: true,
            showCloseIcon: true,
            showMaximizeIcon: false,
            loop: true,
            escKey: true,
            keyPress: true,
            trapFocus: true,
            controls: true,
            slideEndAnimation: true,
            hideControlOnEnd: false,
            mousewheel: false,
            getCaptionFromTitleOrAlt: true,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: false,
            preload: 2,
            numberOfSlideItemsInDom: 10,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: 0,
            iframeWidth: "100%",
            iframeHeight: "100%",
            iframeMaxWidth: "100%",
            iframeMaxHeight: "100%",
            download: true,
            counter: true,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: true,
            enableDrag: true,
            dynamic: false,
            dynamicEl: [],
            extraProps: [],
            exThumbImage: "",
            isMobile: void 0,
            mobileSettings: {
                controls: false,
                showCloseIcon: false,
                download: false
            },
            plugins: [],
            strings: {
                closeGallery: "Close gallery",
                toggleMaximize: "Toggle maximize",
                previousSlide: "Previous slide",
                nextSlide: "Next slide",
                download: "Download",
                playVideo: "Play video"
            }
        };
        function initLgPolyfills() {
            (function() {
                if ("function" === typeof window.CustomEvent) return false;
                function CustomEvent(event, params) {
                    params = params || {
                        bubbles: false,
                        cancelable: false,
                        detail: null
                    };
                    var evt = document.createEvent("CustomEvent");
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }
                window.CustomEvent = CustomEvent;
            })();
            (function() {
                if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
            })();
        }
        var lgQuery = function() {
            function lgQuery(selector) {
                this.cssVenderPrefixes = [ "TransitionDuration", "TransitionTimingFunction", "Transform", "Transition" ];
                this.selector = this._getSelector(selector);
                this.firstElement = this._getFirstEl();
                return this;
            }
            lgQuery.generateUUID = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(c) {
                    var r = 16 * Math.random() | 0, v = "x" == c ? r : 3 & r | 8;
                    return v.toString(16);
                }));
            };
            lgQuery.prototype._getSelector = function(selector, context) {
                if (void 0 === context) context = document;
                if ("string" !== typeof selector) return selector;
                context = context || document;
                var fl = selector.substring(0, 1);
                if ("#" === fl) return context.querySelector(selector); else return context.querySelectorAll(selector);
            };
            lgQuery.prototype._each = function(func) {
                if (!this.selector) return this;
                if (void 0 !== this.selector.length) [].forEach.call(this.selector, func); else func(this.selector, 0);
                return this;
            };
            lgQuery.prototype._setCssVendorPrefix = function(el, cssProperty, value) {
                var property = cssProperty.replace(/-([a-z])/gi, (function(s, group1) {
                    return group1.toUpperCase();
                }));
                if (-1 !== this.cssVenderPrefixes.indexOf(property)) {
                    el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
                    el.style["webkit" + property] = value;
                    el.style["moz" + property] = value;
                    el.style["ms" + property] = value;
                    el.style["o" + property] = value;
                } else el.style[property] = value;
            };
            lgQuery.prototype._getFirstEl = function() {
                if (this.selector && void 0 !== this.selector.length) return this.selector[0]; else return this.selector;
            };
            lgQuery.prototype.isEventMatched = function(event, eventName) {
                var eventNamespace = eventName.split(".");
                return event.split(".").filter((function(e) {
                    return e;
                })).every((function(e) {
                    return -1 !== eventNamespace.indexOf(e);
                }));
            };
            lgQuery.prototype.attr = function(attr, value) {
                if (void 0 === value) {
                    if (!this.firstElement) return "";
                    return this.firstElement.getAttribute(attr);
                }
                this._each((function(el) {
                    el.setAttribute(attr, value);
                }));
                return this;
            };
            lgQuery.prototype.find = function(selector) {
                return $LG(this._getSelector(selector, this.selector));
            };
            lgQuery.prototype.first = function() {
                if (this.selector && void 0 !== this.selector.length) return $LG(this.selector[0]); else return $LG(this.selector);
            };
            lgQuery.prototype.eq = function(index) {
                return $LG(this.selector[index]);
            };
            lgQuery.prototype.parent = function() {
                return $LG(this.selector.parentElement);
            };
            lgQuery.prototype.get = function() {
                return this._getFirstEl();
            };
            lgQuery.prototype.removeAttr = function(attributes) {
                var attrs = attributes.split(" ");
                this._each((function(el) {
                    attrs.forEach((function(attr) {
                        return el.removeAttribute(attr);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.wrap = function(className) {
                if (!this.firstElement) return this;
                var wrapper = document.createElement("div");
                wrapper.className = className;
                this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
                this.firstElement.parentNode.removeChild(this.firstElement);
                wrapper.appendChild(this.firstElement);
                return this;
            };
            lgQuery.prototype.addClass = function(classNames) {
                if (void 0 === classNames) classNames = "";
                this._each((function(el) {
                    classNames.split(" ").forEach((function(className) {
                        if (className) el.classList.add(className);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.removeClass = function(classNames) {
                this._each((function(el) {
                    classNames.split(" ").forEach((function(className) {
                        if (className) el.classList.remove(className);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.hasClass = function(className) {
                if (!this.firstElement) return false;
                return this.firstElement.classList.contains(className);
            };
            lgQuery.prototype.hasAttribute = function(attribute) {
                if (!this.firstElement) return false;
                return this.firstElement.hasAttribute(attribute);
            };
            lgQuery.prototype.toggleClass = function(className) {
                if (!this.firstElement) return this;
                if (this.hasClass(className)) this.removeClass(className); else this.addClass(className);
                return this;
            };
            lgQuery.prototype.css = function(property, value) {
                var _this = this;
                this._each((function(el) {
                    _this._setCssVendorPrefix(el, property, value);
                }));
                return this;
            };
            lgQuery.prototype.on = function(events, listener) {
                var _this = this;
                if (!this.selector) return this;
                events.split(" ").forEach((function(event) {
                    if (!Array.isArray(lgQuery.eventListeners[event])) lgQuery.eventListeners[event] = [];
                    lgQuery.eventListeners[event].push(listener);
                    _this.selector.addEventListener(event.split(".")[0], listener);
                }));
                return this;
            };
            lgQuery.prototype.once = function(event, listener) {
                var _this = this;
                this.on(event, (function() {
                    _this.off(event);
                    listener(event);
                }));
                return this;
            };
            lgQuery.prototype.off = function(event) {
                var _this = this;
                if (!this.selector) return this;
                Object.keys(lgQuery.eventListeners).forEach((function(eventName) {
                    if (_this.isEventMatched(event, eventName)) {
                        lgQuery.eventListeners[eventName].forEach((function(listener) {
                            _this.selector.removeEventListener(eventName.split(".")[0], listener);
                        }));
                        lgQuery.eventListeners[eventName] = [];
                    }
                }));
                return this;
            };
            lgQuery.prototype.trigger = function(event, detail) {
                if (!this.firstElement) return this;
                var customEvent = new CustomEvent(event.split(".")[0], {
                    detail: detail || null
                });
                this.firstElement.dispatchEvent(customEvent);
                return this;
            };
            lgQuery.prototype.load = function(url) {
                var _this = this;
                fetch(url).then((function(res) {
                    return res.text();
                })).then((function(html) {
                    _this.selector.innerHTML = html;
                }));
                return this;
            };
            lgQuery.prototype.html = function(html) {
                if (void 0 === html) {
                    if (!this.firstElement) return "";
                    return this.firstElement.innerHTML;
                }
                this._each((function(el) {
                    el.innerHTML = html;
                }));
                return this;
            };
            lgQuery.prototype.append = function(html) {
                this._each((function(el) {
                    if ("string" === typeof html) el.insertAdjacentHTML("beforeend", html); else el.appendChild(html);
                }));
                return this;
            };
            lgQuery.prototype.prepend = function(html) {
                this._each((function(el) {
                    el.insertAdjacentHTML("afterbegin", html);
                }));
                return this;
            };
            lgQuery.prototype.remove = function() {
                this._each((function(el) {
                    el.parentNode.removeChild(el);
                }));
                return this;
            };
            lgQuery.prototype.empty = function() {
                this._each((function(el) {
                    el.innerHTML = "";
                }));
                return this;
            };
            lgQuery.prototype.scrollTop = function(scrollTop) {
                if (void 0 !== scrollTop) {
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    return this;
                } else return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            };
            lgQuery.prototype.scrollLeft = function(scrollLeft) {
                if (void 0 !== scrollLeft) {
                    document.body.scrollLeft = scrollLeft;
                    document.documentElement.scrollLeft = scrollLeft;
                    return this;
                } else return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            };
            lgQuery.prototype.offset = function() {
                if (!this.firstElement) return {
                    left: 0,
                    top: 0
                };
                var rect = this.firstElement.getBoundingClientRect();
                var bodyMarginLeft = $LG("body").style().marginLeft;
                return {
                    left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
                    top: rect.top + this.scrollTop()
                };
            };
            lgQuery.prototype.style = function() {
                if (!this.firstElement) return {};
                return this.firstElement.currentStyle || window.getComputedStyle(this.firstElement);
            };
            lgQuery.prototype.width = function() {
                var style = this.style();
                return this.firstElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
            };
            lgQuery.prototype.height = function() {
                var style = this.style();
                return this.firstElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
            };
            lgQuery.eventListeners = {};
            return lgQuery;
        }();
        function $LG(selector) {
            initLgPolyfills();
            return new lgQuery(selector);
        }
        var defaultDynamicOptions = [ "src", "sources", "subHtml", "subHtmlUrl", "html", "video", "poster", "slideName", "responsive", "srcset", "sizes", "iframe", "downloadUrl", "download", "width", "facebookShareUrl", "tweetText", "iframeTitle", "twitterShareUrl", "pinterestShareUrl", "pinterestText", "fbHtml", "disqusIdentifier", "disqusUrl" ];
        function convertToData(attr) {
            if ("href" === attr) return "src";
            attr = attr.replace("data-", "");
            attr = attr.charAt(0).toLowerCase() + attr.slice(1);
            attr = attr.replace(/-([a-z])/g, (function(g) {
                return g[1].toUpperCase();
            }));
            return attr;
        }
        var utils = {
            getSize: function(el, container, spacing, defaultLgSize) {
                if (void 0 === spacing) spacing = 0;
                var LGel = $LG(el);
                var lgSize = LGel.attr("data-lg-size") || defaultLgSize;
                if (!lgSize) return;
                var isResponsiveSizes = lgSize.split(",");
                if (isResponsiveSizes[1]) {
                    var wWidth = window.innerWidth;
                    for (var i = 0; i < isResponsiveSizes.length; i++) {
                        var size_1 = isResponsiveSizes[i];
                        var responsiveWidth = parseInt(size_1.split("-")[2], 10);
                        if (responsiveWidth > wWidth) {
                            lgSize = size_1;
                            break;
                        }
                        if (i === isResponsiveSizes.length - 1) lgSize = size_1;
                    }
                }
                var size = lgSize.split("-");
                var width = parseInt(size[0], 10);
                var height = parseInt(size[1], 10);
                var cWidth = container.width();
                var cHeight = container.height() - spacing;
                var maxWidth = Math.min(cWidth, width);
                var maxHeight = Math.min(cHeight, height);
                var ratio = Math.min(maxWidth / width, maxHeight / height);
                return {
                    width: width * ratio,
                    height: height * ratio
                };
            },
            getTransform: function(el, container, top, bottom, imageSize) {
                if (!imageSize) return;
                var LGel = $LG(el).find("img").first();
                if (!LGel.get()) return;
                var containerRect = container.get().getBoundingClientRect();
                var wWidth = containerRect.width;
                var wHeight = container.height() - (top + bottom);
                var elWidth = LGel.width();
                var elHeight = LGel.height();
                var elStyle = LGel.style();
                var x = (wWidth - elWidth) / 2 - LGel.offset().left + (parseFloat(elStyle.paddingLeft) || 0) + (parseFloat(elStyle.borderLeft) || 0) + $LG(window).scrollLeft() + containerRect.left;
                var y = (wHeight - elHeight) / 2 - LGel.offset().top + (parseFloat(elStyle.paddingTop) || 0) + (parseFloat(elStyle.borderTop) || 0) + $LG(window).scrollTop() + top;
                var scX = elWidth / imageSize.width;
                var scY = elHeight / imageSize.height;
                var transform = "translate3d(" + (x *= -1) + "px, " + (y *= -1) + "px, 0) scale3d(" + scX + ", " + scY + ", 1)";
                return transform;
            },
            getIframeMarkup: function(iframeWidth, iframeHeight, iframeMaxWidth, iframeMaxHeight, src, iframeTitle) {
                var title = iframeTitle ? 'title="' + iframeTitle + '"' : "";
                return '<div class="lg-video-cont lg-has-iframe" style="width:' + iframeWidth + "; max-width:" + iframeMaxWidth + "; height: " + iframeHeight + "; max-height:" + iframeMaxHeight + '">\n                    <iframe class="lg-object" frameborder="0" ' + title + ' src="' + src + '"  allowfullscreen="true"></iframe>\n                </div>';
            },
            getImgMarkup: function(index, src, altAttr, srcset, sizes, sources) {
                var srcsetAttr = srcset ? 'srcset="' + srcset + '"' : "";
                var sizesAttr = sizes ? 'sizes="' + sizes + '"' : "";
                var imgMarkup = "<img " + altAttr + " " + srcsetAttr + "  " + sizesAttr + ' class="lg-object lg-image" data-index="' + index + '" src="' + src + '" />';
                var sourceTag = "";
                if (sources) {
                    var sourceObj = "string" === typeof sources ? JSON.parse(sources) : sources;
                    sourceTag = sourceObj.map((function(source) {
                        var attrs = "";
                        Object.keys(source).forEach((function(key) {
                            attrs += " " + key + '="' + source[key] + '"';
                        }));
                        return "<source " + attrs + "></source>";
                    }));
                }
                return "" + sourceTag + imgMarkup;
            },
            getResponsiveSrc: function(srcItms) {
                var rsWidth = [];
                var rsSrc = [];
                var src = "";
                for (var i = 0; i < srcItms.length; i++) {
                    var _src = srcItms[i].split(" ");
                    if ("" === _src[0]) _src.splice(0, 1);
                    rsSrc.push(_src[0]);
                    rsWidth.push(_src[1]);
                }
                var wWidth = window.innerWidth;
                for (var j = 0; j < rsWidth.length; j++) if (parseInt(rsWidth[j], 10) > wWidth) {
                    src = rsSrc[j];
                    break;
                }
                return src;
            },
            isImageLoaded: function(img) {
                if (!img) return false;
                if (!img.complete) return false;
                if (0 === img.naturalWidth) return false;
                return true;
            },
            getVideoPosterMarkup: function(_poster, dummyImg, videoContStyle, playVideoString, _isVideo) {
                var videoClass = "";
                if (_isVideo && _isVideo.youtube) videoClass = "lg-has-youtube"; else if (_isVideo && _isVideo.vimeo) videoClass = "lg-has-vimeo"; else videoClass = "lg-has-html5";
                return '<div class="lg-video-cont ' + videoClass + '" style="' + videoContStyle + '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' + playVideoString + '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' + playVideoString + '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' + (dummyImg || "") + '\n            <img class="lg-object lg-video-poster" src="' + _poster + '" />\n        </div>';
            },
            getFocusableElements: function(container) {
                var elements = container.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
                var visibleElements = [].filter.call(elements, (function(element) {
                    var style = window.getComputedStyle(element);
                    return "none" !== style.display && "hidden" !== style.visibility;
                }));
                return visibleElements;
            },
            getDynamicOptions: function(items, extraProps, getCaptionFromTitleOrAlt, exThumbImage) {
                var dynamicElements = [];
                var availableDynamicOptions = __spreadArrays(defaultDynamicOptions, extraProps);
                [].forEach.call(items, (function(item) {
                    var dynamicEl = {};
                    for (var i = 0; i < item.attributes.length; i++) {
                        var attr = item.attributes[i];
                        if (attr.specified) {
                            var dynamicAttr = convertToData(attr.name);
                            var label = "";
                            if (availableDynamicOptions.indexOf(dynamicAttr) > -1) label = dynamicAttr;
                            if (label) dynamicEl[label] = attr.value;
                        }
                    }
                    var currentItem = $LG(item);
                    var alt = currentItem.find("img").first().attr("alt");
                    var title = currentItem.attr("title");
                    var thumb = exThumbImage ? currentItem.attr(exThumbImage) : currentItem.find("img").first().attr("src");
                    dynamicEl.thumb = thumb;
                    if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml) dynamicEl.subHtml = title || alt || "";
                    dynamicEl.alt = alt || title || "";
                    dynamicElements.push(dynamicEl);
                }));
                return dynamicElements;
            },
            isMobile: function() {
                return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            },
            isVideo: function(src, isHTML5VIdeo, index) {
                if (!src) if (isHTML5VIdeo) return {
                    html5: true
                }; else {
                    console.error("lightGallery :- data-src is not provided on slide item " + (index + 1) + ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/");
                    return;
                }
                var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i);
                var vimeo = src.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i);
                var wistia = src.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
                if (youtube) return {
                    youtube
                }; else if (vimeo) return {
                    vimeo
                }; else if (wistia) return {
                    wistia
                };
            }
        };
        var lgId = 0;
        var LightGallery = function() {
            function LightGallery(element, options) {
                this.lgOpened = false;
                this.index = 0;
                this.plugins = [];
                this.lGalleryOn = false;
                this.lgBusy = false;
                this.currentItemsInDom = [];
                this.prevScrollTop = 0;
                this.bodyPaddingRight = 0;
                this.isDummyImageRemoved = false;
                this.dragOrSwipeEnabled = false;
                this.mediaContainerPosition = {
                    top: 0,
                    bottom: 0
                };
                if (!element) return this;
                lgId++;
                this.lgId = lgId;
                this.el = element;
                this.LGel = $LG(element);
                this.generateSettings(options);
                this.buildModules();
                if (this.settings.dynamic && void 0 !== this.settings.dynamicEl && !Array.isArray(this.settings.dynamicEl)) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                this.galleryItems = this.getItems();
                this.normalizeSettings();
                this.init();
                this.validateLicense();
                return this;
            }
            LightGallery.prototype.generateSettings = function(options) {
                this.settings = __assign(__assign({}, lightGalleryCoreSettings), options);
                if (this.settings.isMobile && "function" === typeof this.settings.isMobile ? this.settings.isMobile() : utils.isMobile()) {
                    var mobileSettings = __assign(__assign({}, this.settings.mobileSettings), this.settings.mobileSettings);
                    this.settings = __assign(__assign({}, this.settings), mobileSettings);
                }
            };
            LightGallery.prototype.normalizeSettings = function() {
                if (this.settings.slideEndAnimation) this.settings.hideControlOnEnd = false;
                if (!this.settings.closable) this.settings.swipeToClose = false;
                this.zoomFromOrigin = this.settings.zoomFromOrigin;
                if (this.settings.dynamic) this.zoomFromOrigin = false;
                if (!this.settings.container) this.settings.container = document.body;
                this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length);
            };
            LightGallery.prototype.init = function() {
                var _this = this;
                this.addSlideVideoInfo(this.galleryItems);
                this.buildStructure();
                this.LGel.trigger(lGEvents.init, {
                    instance: this
                });
                if (this.settings.keyPress) this.keyPress();
                setTimeout((function() {
                    _this.enableDrag();
                    _this.enableSwipe();
                    _this.triggerPosterClick();
                }), 50);
                this.arrow();
                if (this.settings.mousewheel) this.mousewheel();
                if (!this.settings.dynamic) this.openGalleryOnItemClick();
            };
            LightGallery.prototype.openGalleryOnItemClick = function() {
                var _this = this;
                var _loop_1 = function(index) {
                    var element = this_1.items[index];
                    var $element = $LG(element);
                    var uuid = lgQuery.generateUUID();
                    $element.attr("data-lg-id", uuid).on("click.lgcustom-item-" + uuid, (function(e) {
                        e.preventDefault();
                        var currentItemIndex = _this.settings.index || index;
                        _this.openGallery(currentItemIndex, element);
                    }));
                };
                var this_1 = this;
                for (var index = 0; index < this.items.length; index++) _loop_1(index);
            };
            LightGallery.prototype.buildModules = function() {
                var _this = this;
                this.settings.plugins.forEach((function(plugin) {
                    _this.plugins.push(new plugin(_this, $LG));
                }));
            };
            LightGallery.prototype.validateLicense = function() {
                if (!this.settings.licenseKey) console.error("Please provide a valid license key"); else if ("0000-0000-000-0000" === this.settings.licenseKey) console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use");
            };
            LightGallery.prototype.getSlideItem = function(index) {
                return $LG(this.getSlideItemId(index));
            };
            LightGallery.prototype.getSlideItemId = function(index) {
                return "#lg-item-" + this.lgId + "-" + index;
            };
            LightGallery.prototype.getIdName = function(id) {
                return id + "-" + this.lgId;
            };
            LightGallery.prototype.getElementById = function(id) {
                return $LG("#" + this.getIdName(id));
            };
            LightGallery.prototype.manageSingleSlideClassName = function() {
                if (this.galleryItems.length < 2) this.outer.addClass("lg-single-item"); else this.outer.removeClass("lg-single-item");
            };
            LightGallery.prototype.buildStructure = function() {
                var _this = this;
                var container = this.$container && this.$container.get();
                if (container) return;
                var controls = "";
                var subHtmlCont = "";
                if (this.settings.controls) controls = '<button type="button" id="' + this.getIdName("lg-prev") + '" aria-label="' + this.settings.strings["previousSlide"] + '" class="lg-prev lg-icon"> ' + this.settings.prevHtml + ' </button>\n                <button type="button" id="' + this.getIdName("lg-next") + '" aria-label="' + this.settings.strings["nextSlide"] + '" class="lg-next lg-icon"> ' + this.settings.nextHtml + " </button>";
                if (".lg-item" !== this.settings.appendSubHtmlTo) subHtmlCont = '<div class="lg-sub-html" role="status" aria-live="polite"></div>';
                var addClasses = "";
                if (this.settings.allowMediaOverlap) addClasses += "lg-media-overlap ";
                var ariaLabelledby = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : "";
                var ariaDescribedby = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : "";
                var containerClassName = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? "lg-inline" : "");
                var closeIcon = this.settings.closable && this.settings.showCloseIcon ? '<button type="button" aria-label="' + this.settings.strings["closeGallery"] + '" id="' + this.getIdName("lg-close") + '" class="lg-close lg-icon"></button>' : "";
                var maximizeIcon = this.settings.showMaximizeIcon ? '<button type="button" aria-label="' + this.settings.strings["toggleMaximize"] + '" id="' + this.getIdName("lg-maximize") + '" class="lg-maximize lg-icon"></button>' : "";
                var template = '\n        <div class="' + containerClassName + '" id="' + this.getIdName("lg-container") + '" tabindex="-1" aria-modal="true" ' + ariaLabelledby + " " + ariaDescribedby + ' role="dialog"\n        >\n            <div id="' + this.getIdName("lg-backdrop") + '" class="lg-backdrop"></div>\n\n            <div id="' + this.getIdName("lg-outer") + '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' + addClasses + ' ">\n\n              <div id="' + this.getIdName("lg-content") + '" class="lg-content">\n                <div id="' + this.getIdName("lg-inner") + '" class="lg-inner">\n                </div>\n                ' + controls + '\n              </div>\n                <div id="' + this.getIdName("lg-toolbar") + '" class="lg-toolbar lg-group">\n                    ' + maximizeIcon + "\n                    " + closeIcon + "\n                    </div>\n                    " + (".lg-outer" === this.settings.appendSubHtmlTo ? subHtmlCont : "") + '\n                <div id="' + this.getIdName("lg-components") + '" class="lg-components">\n                    ' + (".lg-sub-html" === this.settings.appendSubHtmlTo ? subHtmlCont : "") + "\n                </div>\n            </div>\n        </div>\n        ";
                $LG(this.settings.container).append(template);
                if (document.body !== this.settings.container) $LG(this.settings.container).css("position", "relative");
                this.outer = this.getElementById("lg-outer");
                this.$lgComponents = this.getElementById("lg-components");
                this.$backdrop = this.getElementById("lg-backdrop");
                this.$container = this.getElementById("lg-container");
                this.$inner = this.getElementById("lg-inner");
                this.$content = this.getElementById("lg-content");
                this.$toolbar = this.getElementById("lg-toolbar");
                this.$backdrop.css("transition-duration", this.settings.backdropDuration + "ms");
                var outerClassNames = this.settings.mode + " ";
                this.manageSingleSlideClassName();
                if (this.settings.enableDrag) outerClassNames += "lg-grab ";
                this.outer.addClass(outerClassNames);
                this.$inner.css("transition-timing-function", this.settings.easing);
                this.$inner.css("transition-duration", this.settings.speed + "ms");
                if (this.settings.download) this.$toolbar.append('<a id="' + this.getIdName("lg-download") + '" target="_blank" rel="noopener" aria-label="' + this.settings.strings["download"] + '" download class="lg-download lg-icon"></a>');
                this.counter();
                $LG(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, (function() {
                    _this.refreshOnResize();
                }));
                this.hideBars();
                this.manageCloseGallery();
                this.toggleMaximize();
                this.initModules();
            };
            LightGallery.prototype.refreshOnResize = function() {
                if (this.lgOpened) {
                    var currentGalleryItem = this.galleryItems[this.index];
                    var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
                    this.mediaContainerPosition = this.getMediaContainerPosition();
                    var _a = this.mediaContainerPosition, top_1 = _a.top, bottom = _a.bottom;
                    this.currentImageSize = utils.getSize(this.items[this.index], this.outer, top_1 + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                    if (__slideVideoInfo) this.resizeVideoSlide(this.index, this.currentImageSize);
                    if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
                        var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                        this.outer.find(".lg-current .lg-dummy-img").first().attr("style", imgStyle);
                    }
                    this.LGel.trigger(lGEvents.containerResize);
                }
            };
            LightGallery.prototype.resizeVideoSlide = function(index, imageSize) {
                var lgVideoStyle = this.getVideoContStyle(imageSize);
                var currentSlide = this.getSlideItem(index);
                currentSlide.find(".lg-video-cont").attr("style", lgVideoStyle);
            };
            LightGallery.prototype.updateSlides = function(items, index) {
                if (this.index > items.length - 1) this.index = items.length - 1;
                if (1 === items.length) this.index = 0;
                if (!items.length) {
                    this.closeGallery();
                    return;
                }
                var currentSrc = this.galleryItems[index].src;
                this.galleryItems = items;
                this.updateControls();
                this.$inner.empty();
                this.currentItemsInDom = [];
                var _index = 0;
                this.galleryItems.some((function(galleryItem, itemIndex) {
                    if (galleryItem.src === currentSrc) {
                        _index = itemIndex;
                        return true;
                    }
                    return false;
                }));
                this.currentItemsInDom = this.organizeSlideItems(_index, -1);
                this.loadContent(_index, true);
                this.getSlideItem(_index).addClass("lg-current");
                this.index = _index;
                this.updateCurrentCounter(_index);
                this.LGel.trigger(lGEvents.updateSlides);
            };
            LightGallery.prototype.getItems = function() {
                this.items = [];
                if (!this.settings.dynamic) {
                    if ("this" === this.settings.selector) this.items.push(this.el); else if (this.settings.selector) if ("string" === typeof this.settings.selector) if (this.settings.selectWithin) {
                        var selectWithin = $LG(this.settings.selectWithin);
                        this.items = selectWithin.find(this.settings.selector).get();
                    } else this.items = this.el.querySelectorAll(this.settings.selector); else this.items = this.settings.selector; else this.items = this.el.children;
                    return utils.getDynamicOptions(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
                } else return this.settings.dynamicEl || [];
            };
            LightGallery.prototype.shouldHideScrollbar = function() {
                return this.settings.hideScrollbar && document.body === this.settings.container;
            };
            LightGallery.prototype.hideScrollbar = function() {
                if (!this.shouldHideScrollbar()) return;
                this.bodyPaddingRight = parseFloat($LG("body").style().paddingRight);
                var bodyRect = document.documentElement.getBoundingClientRect();
                var scrollbarWidth = window.innerWidth - bodyRect.width;
                $LG(document.body).css("padding-right", scrollbarWidth + this.bodyPaddingRight + "px");
                $LG(document.body).addClass("lg-overlay-open");
            };
            LightGallery.prototype.resetScrollBar = function() {
                if (!this.shouldHideScrollbar()) return;
                $LG(document.body).css("padding-right", this.bodyPaddingRight + "px");
                $LG(document.body).removeClass("lg-overlay-open");
            };
            LightGallery.prototype.openGallery = function(index, element) {
                var _this = this;
                if (void 0 === index) index = this.settings.index;
                if (this.lgOpened) return;
                this.lgOpened = true;
                this.outer.removeClass("lg-hide-items");
                this.hideScrollbar();
                this.$container.addClass("lg-show");
                var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, index);
                this.currentItemsInDom = itemsToBeInsertedToDom;
                var items = "";
                itemsToBeInsertedToDom.forEach((function(item) {
                    items = items + '<div id="' + item + '" class="lg-item"></div>';
                }));
                this.$inner.append(items);
                this.addHtml(index);
                var transform = "";
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var _a = this.mediaContainerPosition, top = _a.top, bottom = _a.bottom;
                if (!this.settings.allowMediaOverlap) this.setMediaContainerPosition(top, bottom);
                var __slideVideoInfo = this.galleryItems[index].__slideVideoInfo;
                if (this.zoomFromOrigin && element) {
                    this.currentImageSize = utils.getSize(element, this.outer, top + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                    transform = utils.getTransform(element, this.outer, top, bottom, this.currentImageSize);
                }
                if (!this.zoomFromOrigin || !transform) {
                    this.outer.addClass(this.settings.startClass);
                    this.getSlideItem(index).removeClass("lg-complete");
                }
                var timeout = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
                setTimeout((function() {
                    _this.outer.addClass("lg-components-open");
                }), timeout);
                this.index = index;
                this.LGel.trigger(lGEvents.beforeOpen);
                this.getSlideItem(index).addClass("lg-current");
                this.lGalleryOn = false;
                this.prevScrollTop = $LG(window).scrollTop();
                setTimeout((function() {
                    if (_this.zoomFromOrigin && transform) {
                        var currentSlide_1 = _this.getSlideItem(index);
                        currentSlide_1.css("transform", transform);
                        setTimeout((function() {
                            currentSlide_1.addClass("lg-start-progress lg-start-end-progress").css("transition-duration", _this.settings.startAnimationDuration + "ms");
                            _this.outer.addClass("lg-zoom-from-image");
                        }));
                        setTimeout((function() {
                            currentSlide_1.css("transform", "translate3d(0, 0, 0)");
                        }), 100);
                    }
                    setTimeout((function() {
                        _this.$backdrop.addClass("in");
                        _this.$container.addClass("lg-show-in");
                    }), 10);
                    setTimeout((function() {
                        if (_this.settings.trapFocus && document.body === _this.settings.container) _this.trapFocus();
                    }), _this.settings.backdropDuration + 50);
                    if (!_this.zoomFromOrigin || !transform) setTimeout((function() {
                        _this.outer.addClass("lg-visible");
                    }), _this.settings.backdropDuration);
                    _this.slide(index, false, false, false);
                    _this.LGel.trigger(lGEvents.afterOpen);
                }));
                if (document.body === this.settings.container) $LG("html").addClass("lg-on");
            };
            LightGallery.prototype.getMediaContainerPosition = function() {
                if (this.settings.allowMediaOverlap) return {
                    top: 0,
                    bottom: 0
                };
                var top = this.$toolbar.get().clientHeight || 0;
                var subHtml = this.outer.find(".lg-components .lg-sub-html").get();
                var captionHeight = this.settings.defaultCaptionHeight || subHtml && subHtml.clientHeight || 0;
                var thumbContainer = this.outer.find(".lg-thumb-outer").get();
                var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
                var bottom = thumbHeight + captionHeight;
                return {
                    top,
                    bottom
                };
            };
            LightGallery.prototype.setMediaContainerPosition = function(top, bottom) {
                if (void 0 === top) top = 0;
                if (void 0 === bottom) bottom = 0;
                this.$content.css("top", top + "px").css("bottom", bottom + "px");
            };
            LightGallery.prototype.hideBars = function() {
                var _this = this;
                setTimeout((function() {
                    _this.outer.removeClass("lg-hide-items");
                    if (_this.settings.hideBarsDelay > 0) {
                        _this.outer.on("mousemove.lg click.lg touchstart.lg", (function() {
                            _this.outer.removeClass("lg-hide-items");
                            clearTimeout(_this.hideBarTimeout);
                            _this.hideBarTimeout = setTimeout((function() {
                                _this.outer.addClass("lg-hide-items");
                            }), _this.settings.hideBarsDelay);
                        }));
                        _this.outer.trigger("mousemove.lg");
                    }
                }), this.settings.showBarsAfter);
            };
            LightGallery.prototype.initPictureFill = function($img) {
                if (this.settings.supportLegacyBrowser) try {
                    picturefill({
                        elements: [ $img.get() ]
                    });
                } catch (e) {
                    console.warn("lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.");
                }
            };
            LightGallery.prototype.counter = function() {
                if (this.settings.counter) {
                    var counterHtml = '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' + this.getIdName("lg-counter-current") + '" class="lg-counter-current">' + (this.index + 1) + ' </span> /\n                <span id="' + this.getIdName("lg-counter-all") + '" class="lg-counter-all">' + this.galleryItems.length + " </span></div>";
                    this.outer.find(this.settings.appendCounterTo).append(counterHtml);
                }
            };
            LightGallery.prototype.addHtml = function(index) {
                var subHtml;
                var subHtmlUrl;
                if (this.galleryItems[index].subHtmlUrl) subHtmlUrl = this.galleryItems[index].subHtmlUrl; else subHtml = this.galleryItems[index].subHtml;
                if (!subHtmlUrl) if (subHtml) {
                    var fL = subHtml.substring(0, 1);
                    if ("." === fL || "#" === fL) if (this.settings.subHtmlSelectorRelative && !this.settings.dynamic) subHtml = $LG(this.items).eq(index).find(subHtml).first().html(); else subHtml = $LG(subHtml).first().html();
                } else subHtml = "";
                if (".lg-item" !== this.settings.appendSubHtmlTo) if (subHtmlUrl) this.outer.find(".lg-sub-html").load(subHtmlUrl); else this.outer.find(".lg-sub-html").html(subHtml); else {
                    var currentSlide = $LG(this.getSlideItemId(index));
                    if (subHtmlUrl) currentSlide.load(subHtmlUrl); else currentSlide.append('<div class="lg-sub-html">' + subHtml + "</div>");
                }
                if ("undefined" !== typeof subHtml && null !== subHtml) if ("" === subHtml) this.outer.find(this.settings.appendSubHtmlTo).addClass("lg-empty-html"); else this.outer.find(this.settings.appendSubHtmlTo).removeClass("lg-empty-html");
                this.LGel.trigger(lGEvents.afterAppendSubHtml, {
                    index
                });
            };
            LightGallery.prototype.preload = function(index) {
                for (var i = 1; i <= this.settings.preload; i++) {
                    if (i >= this.galleryItems.length - index) break;
                    this.loadContent(index + i, false);
                }
                for (var j = 1; j <= this.settings.preload; j++) {
                    if (index - j < 0) break;
                    this.loadContent(index - j, false);
                }
            };
            LightGallery.prototype.getDummyImgStyles = function(imageSize) {
                if (!imageSize) return "";
                return "width:" + imageSize.width + "px;\n                margin-left: -" + imageSize.width / 2 + "px;\n                margin-top: -" + imageSize.height / 2 + "px;\n                height:" + imageSize.height + "px";
            };
            LightGallery.prototype.getVideoContStyle = function(imageSize) {
                if (!imageSize) return "";
                return "width:" + imageSize.width + "px;\n                height:" + imageSize.height + "px";
            };
            LightGallery.prototype.getDummyImageContent = function($currentSlide, index, alt) {
                var $currentItem;
                if (!this.settings.dynamic) $currentItem = $LG(this.items).eq(index);
                if ($currentItem) {
                    var _dummyImgSrc = void 0;
                    if (!this.settings.exThumbImage) _dummyImgSrc = $currentItem.find("img").first().attr("src"); else _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
                    if (!_dummyImgSrc) return "";
                    var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                    var dummyImgContent = "<img " + alt + ' style="' + imgStyle + '" class="lg-dummy-img" src="' + _dummyImgSrc + '" />';
                    $currentSlide.addClass("lg-first-slide");
                    this.outer.addClass("lg-first-slide-loading");
                    return dummyImgContent;
                }
                return "";
            };
            LightGallery.prototype.setImgMarkup = function(src, $currentSlide, index) {
                var currentGalleryItem = this.galleryItems[index];
                var alt = currentGalleryItem.alt, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
                var imgContent = "";
                var altAttr = alt ? 'alt="' + alt + '"' : "";
                if (this.isFirstSlideWithZoomAnimation()) imgContent = this.getDummyImageContent($currentSlide, index, altAttr); else imgContent = utils.getImgMarkup(index, src, altAttr, srcset, sizes, sources);
                var imgMarkup = '<picture class="lg-img-wrap"> ' + imgContent + "</picture>";
                $currentSlide.prepend(imgMarkup);
            };
            LightGallery.prototype.onSlideObjectLoad = function($slide, isHTML5VideoWithoutPoster, onLoad, onError) {
                var mediaObject = $slide.find(".lg-object").first();
                if (utils.isImageLoaded(mediaObject.get()) || isHTML5VideoWithoutPoster) onLoad(); else {
                    mediaObject.on("load.lg error.lg", (function() {
                        onLoad && onLoad();
                    }));
                    mediaObject.on("error.lg", (function() {
                        onError && onError();
                    }));
                }
            };
            LightGallery.prototype.onLgObjectLoad = function(currentSlide, index, delay, speed, isFirstSlide, isHTML5VideoWithoutPoster) {
                var _this = this;
                this.onSlideObjectLoad(currentSlide, isHTML5VideoWithoutPoster, (function() {
                    _this.triggerSlideItemLoad(currentSlide, index, delay, speed, isFirstSlide);
                }), (function() {
                    currentSlide.addClass("lg-complete lg-complete_");
                    currentSlide.html('<span class="lg-error-msg">Oops... Failed to load content...</span>');
                }));
            };
            LightGallery.prototype.triggerSlideItemLoad = function($currentSlide, index, delay, speed, isFirstSlide) {
                var _this = this;
                var currentGalleryItem = this.galleryItems[index];
                var _speed = isFirstSlide && "video" === this.getSlideType(currentGalleryItem) && !currentGalleryItem.poster ? speed : 0;
                setTimeout((function() {
                    $currentSlide.addClass("lg-complete lg-complete_");
                    _this.LGel.trigger(lGEvents.slideItemLoad, {
                        index,
                        delay: delay || 0,
                        isFirstSlide
                    });
                }), _speed);
            };
            LightGallery.prototype.isFirstSlideWithZoomAnimation = function() {
                return !!(!this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize);
            };
            LightGallery.prototype.addSlideVideoInfo = function(items) {
                var _this = this;
                items.forEach((function(element, index) {
                    element.__slideVideoInfo = utils.isVideo(element.src, !!element.video, index);
                    if (element.__slideVideoInfo && _this.settings.loadYouTubePoster && !element.poster && element.__slideVideoInfo.youtube) element.poster = "//img.youtube.com/vi/" + element.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg";
                }));
            };
            LightGallery.prototype.loadContent = function(index, rec) {
                var _this = this;
                var currentGalleryItem = this.galleryItems[index];
                var $currentSlide = $LG(this.getSlideItemId(index));
                var poster = currentGalleryItem.poster, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
                var src = currentGalleryItem.src;
                var video = currentGalleryItem.video;
                var _html5Video = video && "string" === typeof video ? JSON.parse(video) : video;
                if (currentGalleryItem.responsive) {
                    var srcDyItms = currentGalleryItem.responsive.split(",");
                    src = utils.getResponsiveSrc(srcDyItms) || src;
                }
                var videoInfo = currentGalleryItem.__slideVideoInfo;
                var lgVideoStyle = "";
                var iframe = !!currentGalleryItem.iframe;
                var isFirstSlide = !this.lGalleryOn;
                var delay = 0;
                if (isFirstSlide) if (this.zoomFromOrigin && this.currentImageSize) delay = this.settings.startAnimationDuration + 10; else delay = this.settings.backdropDuration + 10;
                if (!$currentSlide.hasClass("lg-loaded")) {
                    if (videoInfo) {
                        var _a = this.mediaContainerPosition, top_2 = _a.top, bottom = _a.bottom;
                        var videoSize = utils.getSize(this.items[index], this.outer, top_2 + bottom, videoInfo && this.settings.videoMaxSize);
                        lgVideoStyle = this.getVideoContStyle(videoSize);
                    }
                    if (iframe) {
                        var markup = utils.getIframeMarkup(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, src, currentGalleryItem.iframeTitle);
                        $currentSlide.prepend(markup);
                    } else if (poster) {
                        var dummyImg = "";
                        var hasStartAnimation = isFirstSlide && this.zoomFromOrigin && this.currentImageSize;
                        if (hasStartAnimation) dummyImg = this.getDummyImageContent($currentSlide, index, "");
                        markup = utils.getVideoPosterMarkup(poster, dummyImg || "", lgVideoStyle, this.settings.strings["playVideo"], videoInfo);
                        $currentSlide.prepend(markup);
                    } else if (videoInfo) {
                        markup = '<div class="lg-video-cont " style="' + lgVideoStyle + '"></div>';
                        $currentSlide.prepend(markup);
                    } else {
                        this.setImgMarkup(src, $currentSlide, index);
                        if (srcset || sources) {
                            var $img = $currentSlide.find(".lg-object");
                            this.initPictureFill($img);
                        }
                    }
                    if (poster || videoInfo) this.LGel.trigger(lGEvents.hasVideo, {
                        index,
                        src,
                        html5Video: _html5Video,
                        hasPoster: !!poster
                    });
                    this.LGel.trigger(lGEvents.afterAppendSlide, {
                        index
                    });
                    if (this.lGalleryOn && ".lg-item" === this.settings.appendSubHtmlTo) this.addHtml(index);
                }
                var _speed = 0;
                if (delay && !$LG(document.body).hasClass("lg-from-hash")) _speed = delay;
                if (this.isFirstSlideWithZoomAnimation()) {
                    setTimeout((function() {
                        $currentSlide.removeClass("lg-start-end-progress lg-start-progress").removeAttr("style");
                    }), this.settings.startAnimationDuration + 100);
                    if (!$currentSlide.hasClass("lg-loaded")) setTimeout((function() {
                        if ("image" === _this.getSlideType(currentGalleryItem)) {
                            var alt = currentGalleryItem.alt;
                            var altAttr = alt ? 'alt="' + alt + '"' : "";
                            $currentSlide.find(".lg-img-wrap").append(utils.getImgMarkup(index, src, altAttr, srcset, sizes, currentGalleryItem.sources));
                            if (srcset || sources) {
                                var $img = $currentSlide.find(".lg-object");
                                _this.initPictureFill($img);
                            }
                        }
                        if ("image" === _this.getSlideType(currentGalleryItem) || "video" === _this.getSlideType(currentGalleryItem) && poster) {
                            _this.onLgObjectLoad($currentSlide, index, delay, _speed, true, false);
                            _this.onSlideObjectLoad($currentSlide, !!(videoInfo && videoInfo.html5 && !poster), (function() {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }), (function() {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }));
                        }
                    }), this.settings.startAnimationDuration + 100);
                }
                $currentSlide.addClass("lg-loaded");
                if (!this.isFirstSlideWithZoomAnimation() || "video" === this.getSlideType(currentGalleryItem) && !poster) this.onLgObjectLoad($currentSlide, index, delay, _speed, isFirstSlide, !!(videoInfo && videoInfo.html5 && !poster));
                if ((!this.zoomFromOrigin || !this.currentImageSize) && $currentSlide.hasClass("lg-complete_") && !this.lGalleryOn) setTimeout((function() {
                    $currentSlide.addClass("lg-complete");
                }), this.settings.backdropDuration);
                this.lGalleryOn = true;
                if (true === rec) if (!$currentSlide.hasClass("lg-complete_")) $currentSlide.find(".lg-object").first().on("load.lg error.lg", (function() {
                    _this.preload(index);
                })); else this.preload(index);
            };
            LightGallery.prototype.loadContentOnFirstSlideLoad = function(index, $currentSlide, speed) {
                var _this = this;
                setTimeout((function() {
                    $currentSlide.find(".lg-dummy-img").remove();
                    $currentSlide.removeClass("lg-first-slide");
                    _this.outer.removeClass("lg-first-slide-loading");
                    _this.isDummyImageRemoved = true;
                    _this.preload(index);
                }), speed + 300);
            };
            LightGallery.prototype.getItemsToBeInsertedToDom = function(index, prevIndex, numberOfItems) {
                var _this = this;
                if (void 0 === numberOfItems) numberOfItems = 0;
                var itemsToBeInsertedToDom = [];
                var possibleNumberOfItems = Math.max(numberOfItems, 3);
                possibleNumberOfItems = Math.min(possibleNumberOfItems, this.galleryItems.length);
                var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
                if (this.galleryItems.length <= 3) {
                    this.galleryItems.forEach((function(_element, index) {
                        itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index);
                    }));
                    return itemsToBeInsertedToDom;
                }
                if (index < (this.galleryItems.length - 1) / 2) {
                    for (var idx = index; idx > index - possibleNumberOfItems / 2 && idx >= 0; idx--) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                    var numberOfExistingItems = itemsToBeInsertedToDom.length;
                    for (idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index + idx + 1));
                } else {
                    for (idx = index; idx <= this.galleryItems.length - 1 && idx < index + possibleNumberOfItems / 2; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                    numberOfExistingItems = itemsToBeInsertedToDom.length;
                    for (idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index - idx - 1));
                }
                if (this.settings.loop) if (index === this.galleryItems.length - 1) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + 0); else if (0 === index) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1));
                if (-1 === itemsToBeInsertedToDom.indexOf(prevIndexItem)) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
                return itemsToBeInsertedToDom;
            };
            LightGallery.prototype.organizeSlideItems = function(index, prevIndex) {
                var _this = this;
                var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, prevIndex, this.settings.numberOfSlideItemsInDom);
                itemsToBeInsertedToDom.forEach((function(item) {
                    if (-1 === _this.currentItemsInDom.indexOf(item)) _this.$inner.append('<div id="' + item + '" class="lg-item"></div>');
                }));
                this.currentItemsInDom.forEach((function(item) {
                    if (-1 === itemsToBeInsertedToDom.indexOf(item)) $LG("#" + item).remove();
                }));
                return itemsToBeInsertedToDom;
            };
            LightGallery.prototype.getPreviousSlideIndex = function() {
                var prevIndex = 0;
                try {
                    var currentItemId = this.outer.find(".lg-current").first().attr("id");
                    prevIndex = parseInt(currentItemId.split("-")[3]) || 0;
                } catch (error) {
                    prevIndex = 0;
                }
                return prevIndex;
            };
            LightGallery.prototype.setDownloadValue = function(index) {
                if (this.settings.download) {
                    var currentGalleryItem = this.galleryItems[index];
                    var hideDownloadBtn = false === currentGalleryItem.downloadUrl || "false" === currentGalleryItem.downloadUrl;
                    if (hideDownloadBtn) this.outer.addClass("lg-hide-download"); else {
                        var $download = this.getElementById("lg-download");
                        this.outer.removeClass("lg-hide-download");
                        $download.attr("href", currentGalleryItem.downloadUrl || currentGalleryItem.src);
                        if (currentGalleryItem.download) $download.attr("download", currentGalleryItem.download);
                    }
                }
            };
            LightGallery.prototype.makeSlideAnimation = function(direction, currentSlideItem, previousSlideItem) {
                var _this = this;
                if (this.lGalleryOn) previousSlideItem.addClass("lg-slide-progress");
                setTimeout((function() {
                    _this.outer.addClass("lg-no-trans");
                    _this.outer.find(".lg-item").removeClass("lg-prev-slide lg-next-slide");
                    if ("prev" === direction) {
                        currentSlideItem.addClass("lg-prev-slide");
                        previousSlideItem.addClass("lg-next-slide");
                    } else {
                        currentSlideItem.addClass("lg-next-slide");
                        previousSlideItem.addClass("lg-prev-slide");
                    }
                    setTimeout((function() {
                        _this.outer.find(".lg-item").removeClass("lg-current");
                        currentSlideItem.addClass("lg-current");
                        _this.outer.removeClass("lg-no-trans");
                    }), 50);
                }), this.lGalleryOn ? this.settings.slideDelay : 0);
            };
            LightGallery.prototype.slide = function(index, fromTouch, fromThumb, direction) {
                var _this = this;
                var prevIndex = this.getPreviousSlideIndex();
                this.currentItemsInDom = this.organizeSlideItems(index, prevIndex);
                if (this.lGalleryOn && prevIndex === index) return;
                var numberOfGalleryItems = this.galleryItems.length;
                if (!this.lgBusy) {
                    if (this.settings.counter) this.updateCurrentCounter(index);
                    var currentSlideItem = this.getSlideItem(index);
                    var previousSlideItem_1 = this.getSlideItem(prevIndex);
                    var currentGalleryItem = this.galleryItems[index];
                    var videoInfo = currentGalleryItem.__slideVideoInfo;
                    this.outer.attr("data-lg-slide-type", this.getSlideType(currentGalleryItem));
                    this.setDownloadValue(index);
                    if (videoInfo) {
                        var _a = this.mediaContainerPosition, top_3 = _a.top, bottom = _a.bottom;
                        var videoSize = utils.getSize(this.items[index], this.outer, top_3 + bottom, videoInfo && this.settings.videoMaxSize);
                        this.resizeVideoSlide(index, videoSize);
                    }
                    this.LGel.trigger(lGEvents.beforeSlide, {
                        prevIndex,
                        index,
                        fromTouch: !!fromTouch,
                        fromThumb: !!fromThumb
                    });
                    this.lgBusy = true;
                    clearTimeout(this.hideBarTimeout);
                    this.arrowDisable(index);
                    if (!direction) if (index < prevIndex) direction = "prev"; else if (index > prevIndex) direction = "next";
                    if (!fromTouch) this.makeSlideAnimation(direction, currentSlideItem, previousSlideItem_1); else {
                        this.outer.find(".lg-item").removeClass("lg-prev-slide lg-current lg-next-slide");
                        var touchPrev = void 0;
                        var touchNext = void 0;
                        if (numberOfGalleryItems > 2) {
                            touchPrev = index - 1;
                            touchNext = index + 1;
                            if (0 === index && prevIndex === numberOfGalleryItems - 1) {
                                touchNext = 0;
                                touchPrev = numberOfGalleryItems - 1;
                            } else if (index === numberOfGalleryItems - 1 && 0 === prevIndex) {
                                touchNext = 0;
                                touchPrev = numberOfGalleryItems - 1;
                            }
                        } else {
                            touchPrev = 0;
                            touchNext = 1;
                        }
                        if ("prev" === direction) this.getSlideItem(touchNext).addClass("lg-next-slide"); else this.getSlideItem(touchPrev).addClass("lg-prev-slide");
                        currentSlideItem.addClass("lg-current");
                    }
                    if (!this.lGalleryOn) this.loadContent(index, true); else setTimeout((function() {
                        _this.loadContent(index, true);
                        if (".lg-item" !== _this.settings.appendSubHtmlTo) _this.addHtml(index);
                    }), this.settings.speed + 50 + (fromTouch ? 0 : this.settings.slideDelay));
                    setTimeout((function() {
                        _this.lgBusy = false;
                        previousSlideItem_1.removeClass("lg-slide-progress");
                        _this.LGel.trigger(lGEvents.afterSlide, {
                            prevIndex,
                            index,
                            fromTouch,
                            fromThumb
                        });
                    }), (this.lGalleryOn ? this.settings.speed + 100 : 100) + (fromTouch ? 0 : this.settings.slideDelay));
                }
                this.index = index;
            };
            LightGallery.prototype.updateCurrentCounter = function(index) {
                this.getElementById("lg-counter-current").html(index + 1 + "");
            };
            LightGallery.prototype.updateCounterTotal = function() {
                this.getElementById("lg-counter-all").html(this.galleryItems.length + "");
            };
            LightGallery.prototype.getSlideType = function(item) {
                if (item.__slideVideoInfo) return "video"; else if (item.iframe) return "iframe"; else return "image";
            };
            LightGallery.prototype.touchMove = function(startCoords, endCoords, e) {
                var distanceX = endCoords.pageX - startCoords.pageX;
                var distanceY = endCoords.pageY - startCoords.pageY;
                var allowSwipe = false;
                if (this.swipeDirection) allowSwipe = true; else if (Math.abs(distanceX) > 15) {
                    this.swipeDirection = "horizontal";
                    allowSwipe = true;
                } else if (Math.abs(distanceY) > 15) {
                    this.swipeDirection = "vertical";
                    allowSwipe = true;
                }
                if (!allowSwipe) return;
                var $currentSlide = this.getSlideItem(this.index);
                if ("horizontal" === this.swipeDirection) {
                    null === e || void 0 === e ? void 0 : e.preventDefault();
                    this.outer.addClass("lg-dragging");
                    this.setTranslate($currentSlide, distanceX, 0);
                    var width = $currentSlide.get().offsetWidth;
                    var slideWidthAmount = 15 * width / 100;
                    var gutter = slideWidthAmount - Math.abs(10 * distanceX / 100);
                    this.setTranslate(this.outer.find(".lg-prev-slide").first(), -width + distanceX - gutter, 0);
                    this.setTranslate(this.outer.find(".lg-next-slide").first(), width + distanceX + gutter, 0);
                } else if ("vertical" === this.swipeDirection) if (this.settings.swipeToClose) {
                    null === e || void 0 === e ? void 0 : e.preventDefault();
                    this.$container.addClass("lg-dragging-vertical");
                    var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
                    this.$backdrop.css("opacity", opacity);
                    var scale = 1 - Math.abs(distanceY) / (2 * window.innerWidth);
                    this.setTranslate($currentSlide, 0, distanceY, scale, scale);
                    if (Math.abs(distanceY) > 100) this.outer.addClass("lg-hide-items").removeClass("lg-components-open");
                }
            };
            LightGallery.prototype.touchEnd = function(endCoords, startCoords, event) {
                var _this = this;
                var distance;
                if ("lg-slide" !== this.settings.mode) this.outer.addClass("lg-slide");
                setTimeout((function() {
                    _this.$container.removeClass("lg-dragging-vertical");
                    _this.outer.removeClass("lg-dragging lg-hide-items").addClass("lg-components-open");
                    var triggerClick = true;
                    if ("horizontal" === _this.swipeDirection) {
                        distance = endCoords.pageX - startCoords.pageX;
                        var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
                        if (distance < 0 && distanceAbs > _this.settings.swipeThreshold) {
                            _this.goToNextSlide(true);
                            triggerClick = false;
                        } else if (distance > 0 && distanceAbs > _this.settings.swipeThreshold) {
                            _this.goToPrevSlide(true);
                            triggerClick = false;
                        }
                    } else if ("vertical" === _this.swipeDirection) {
                        distance = Math.abs(endCoords.pageY - startCoords.pageY);
                        if (_this.settings.closable && _this.settings.swipeToClose && distance > 100) {
                            _this.closeGallery();
                            return;
                        } else _this.$backdrop.css("opacity", 1);
                    }
                    _this.outer.find(".lg-item").removeAttr("style");
                    if (triggerClick && Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
                        var target = $LG(event.target);
                        if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                    }
                    _this.swipeDirection = void 0;
                }));
                setTimeout((function() {
                    if (!_this.outer.hasClass("lg-dragging") && "lg-slide" !== _this.settings.mode) _this.outer.removeClass("lg-slide");
                }), this.settings.speed + 100);
            };
            LightGallery.prototype.enableSwipe = function() {
                var _this = this;
                var startCoords = {};
                var endCoords = {};
                var isMoved = false;
                var isSwiping = false;
                if (this.settings.enableSwipe) {
                    this.$inner.on("touchstart.lg", (function(e) {
                        _this.dragOrSwipeEnabled = true;
                        var $item = _this.getSlideItem(_this.index);
                        if (($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) && !_this.outer.hasClass("lg-zoomed") && !_this.lgBusy && 1 === e.touches.length) {
                            isSwiping = true;
                            _this.touchAction = "swipe";
                            _this.manageSwipeClass();
                            startCoords = {
                                pageX: e.touches[0].pageX,
                                pageY: e.touches[0].pageY
                            };
                        }
                    }));
                    this.$inner.on("touchmove.lg", (function(e) {
                        if (isSwiping && "swipe" === _this.touchAction && 1 === e.touches.length) {
                            endCoords = {
                                pageX: e.touches[0].pageX,
                                pageY: e.touches[0].pageY
                            };
                            _this.touchMove(startCoords, endCoords, e);
                            isMoved = true;
                        }
                    }));
                    this.$inner.on("touchend.lg", (function(event) {
                        if ("swipe" === _this.touchAction) {
                            if (isMoved) {
                                isMoved = false;
                                _this.touchEnd(endCoords, startCoords, event);
                            } else if (isSwiping) {
                                var target = $LG(event.target);
                                if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                            }
                            _this.touchAction = void 0;
                            isSwiping = false;
                        }
                    }));
                }
            };
            LightGallery.prototype.enableDrag = function() {
                var _this = this;
                var startCoords = {};
                var endCoords = {};
                var isDraging = false;
                var isMoved = false;
                if (this.settings.enableDrag) {
                    this.outer.on("mousedown.lg", (function(e) {
                        _this.dragOrSwipeEnabled = true;
                        var $item = _this.getSlideItem(_this.index);
                        if ($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) if (!_this.outer.hasClass("lg-zoomed") && !_this.lgBusy) {
                            e.preventDefault();
                            if (!_this.lgBusy) {
                                _this.manageSwipeClass();
                                startCoords = {
                                    pageX: e.pageX,
                                    pageY: e.pageY
                                };
                                isDraging = true;
                                _this.outer.get().scrollLeft += 1;
                                _this.outer.get().scrollLeft -= 1;
                                _this.outer.removeClass("lg-grab").addClass("lg-grabbing");
                                _this.LGel.trigger(lGEvents.dragStart);
                            }
                        }
                    }));
                    $LG(window).on("mousemove.lg.global" + this.lgId, (function(e) {
                        if (isDraging && _this.lgOpened) {
                            isMoved = true;
                            endCoords = {
                                pageX: e.pageX,
                                pageY: e.pageY
                            };
                            _this.touchMove(startCoords, endCoords);
                            _this.LGel.trigger(lGEvents.dragMove);
                        }
                    }));
                    $LG(window).on("mouseup.lg.global" + this.lgId, (function(event) {
                        if (!_this.lgOpened) return;
                        var target = $LG(event.target);
                        if (isMoved) {
                            isMoved = false;
                            _this.touchEnd(endCoords, startCoords, event);
                            _this.LGel.trigger(lGEvents.dragEnd);
                        } else if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                        if (isDraging) {
                            isDraging = false;
                            _this.outer.removeClass("lg-grabbing").addClass("lg-grab");
                        }
                    }));
                }
            };
            LightGallery.prototype.triggerPosterClick = function() {
                var _this = this;
                this.$inner.on("click.lg", (function(event) {
                    if (!_this.dragOrSwipeEnabled && _this.isPosterElement($LG(event.target))) _this.LGel.trigger(lGEvents.posterClick);
                }));
            };
            LightGallery.prototype.manageSwipeClass = function() {
                var _touchNext = this.index + 1;
                var _touchPrev = this.index - 1;
                if (this.settings.loop && this.galleryItems.length > 2) if (0 === this.index) _touchPrev = this.galleryItems.length - 1; else if (this.index === this.galleryItems.length - 1) _touchNext = 0;
                this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide");
                if (_touchPrev > -1) this.getSlideItem(_touchPrev).addClass("lg-prev-slide");
                this.getSlideItem(_touchNext).addClass("lg-next-slide");
            };
            LightGallery.prototype.goToNextSlide = function(fromTouch) {
                var _this = this;
                var _loop = this.settings.loop;
                if (fromTouch && this.galleryItems.length < 3) _loop = false;
                if (!this.lgBusy) if (this.index + 1 < this.galleryItems.length) {
                    this.index++;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index
                    });
                    this.slide(this.index, !!fromTouch, false, "next");
                } else if (_loop) {
                    this.index = 0;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index
                    });
                    this.slide(this.index, !!fromTouch, false, "next");
                } else if (this.settings.slideEndAnimation && !fromTouch) {
                    this.outer.addClass("lg-right-end");
                    setTimeout((function() {
                        _this.outer.removeClass("lg-right-end");
                    }), 400);
                }
            };
            LightGallery.prototype.goToPrevSlide = function(fromTouch) {
                var _this = this;
                var _loop = this.settings.loop;
                if (fromTouch && this.galleryItems.length < 3) _loop = false;
                if (!this.lgBusy) if (this.index > 0) {
                    this.index--;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch
                    });
                    this.slide(this.index, !!fromTouch, false, "prev");
                } else if (_loop) {
                    this.index = this.galleryItems.length - 1;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch
                    });
                    this.slide(this.index, !!fromTouch, false, "prev");
                } else if (this.settings.slideEndAnimation && !fromTouch) {
                    this.outer.addClass("lg-left-end");
                    setTimeout((function() {
                        _this.outer.removeClass("lg-left-end");
                    }), 400);
                }
            };
            LightGallery.prototype.keyPress = function() {
                var _this = this;
                $LG(window).on("keydown.lg.global" + this.lgId, (function(e) {
                    if (_this.lgOpened && true === _this.settings.escKey && 27 === e.keyCode) {
                        e.preventDefault();
                        if (_this.settings.allowMediaOverlap && _this.outer.hasClass("lg-can-toggle") && _this.outer.hasClass("lg-components-open")) _this.outer.removeClass("lg-components-open"); else _this.closeGallery();
                    }
                    if (_this.lgOpened && _this.galleryItems.length > 1) {
                        if (37 === e.keyCode) {
                            e.preventDefault();
                            _this.goToPrevSlide();
                        }
                        if (39 === e.keyCode) {
                            e.preventDefault();
                            _this.goToNextSlide();
                        }
                    }
                }));
            };
            LightGallery.prototype.arrow = function() {
                var _this = this;
                this.getElementById("lg-prev").on("click.lg", (function() {
                    _this.goToPrevSlide();
                }));
                this.getElementById("lg-next").on("click.lg", (function() {
                    _this.goToNextSlide();
                }));
            };
            LightGallery.prototype.arrowDisable = function(index) {
                if (!this.settings.loop && this.settings.hideControlOnEnd) {
                    var $prev = this.getElementById("lg-prev");
                    var $next = this.getElementById("lg-next");
                    if (index + 1 === this.galleryItems.length) $next.attr("disabled", "disabled").addClass("disabled"); else $next.removeAttr("disabled").removeClass("disabled");
                    if (0 === index) $prev.attr("disabled", "disabled").addClass("disabled"); else $prev.removeAttr("disabled").removeClass("disabled");
                }
            };
            LightGallery.prototype.setTranslate = function($el, xValue, yValue, scaleX, scaleY) {
                if (void 0 === scaleX) scaleX = 1;
                if (void 0 === scaleY) scaleY = 1;
                $el.css("transform", "translate3d(" + xValue + "px, " + yValue + "px, 0px) scale3d(" + scaleX + ", " + scaleY + ", 1)");
            };
            LightGallery.prototype.mousewheel = function() {
                var _this = this;
                var lastCall = 0;
                this.outer.on("wheel.lg", (function(e) {
                    if (!e.deltaY || _this.galleryItems.length < 2) return;
                    e.preventDefault();
                    var now = (new Date).getTime();
                    if (now - lastCall < 1e3) return;
                    lastCall = now;
                    if (e.deltaY > 0) _this.goToNextSlide(); else if (e.deltaY < 0) _this.goToPrevSlide();
                }));
            };
            LightGallery.prototype.isSlideElement = function(target) {
                return target.hasClass("lg-outer") || target.hasClass("lg-item") || target.hasClass("lg-img-wrap");
            };
            LightGallery.prototype.isPosterElement = function(target) {
                var playButton = this.getSlideItem(this.index).find(".lg-video-play-button").get();
                return target.hasClass("lg-video-poster") || target.hasClass("lg-video-play-button") || playButton && playButton.contains(target.get());
            };
            LightGallery.prototype.toggleMaximize = function() {
                var _this = this;
                this.getElementById("lg-maximize").on("click.lg", (function() {
                    _this.$container.toggleClass("lg-inline");
                    _this.refreshOnResize();
                }));
            };
            LightGallery.prototype.invalidateItems = function() {
                for (var index = 0; index < this.items.length; index++) {
                    var element = this.items[index];
                    var $element = $LG(element);
                    $element.off("click.lgcustom-item-" + $element.attr("data-lg-id"));
                }
            };
            LightGallery.prototype.trapFocus = function() {
                var _this = this;
                this.$container.get().focus({
                    preventScroll: true
                });
                $LG(window).on("keydown.lg.global" + this.lgId, (function(e) {
                    if (!_this.lgOpened) return;
                    var isTabPressed = "Tab" === e.key || 9 === e.keyCode;
                    if (!isTabPressed) return;
                    var focusableEls = utils.getFocusableElements(_this.$container.get());
                    var firstFocusableEl = focusableEls[0];
                    var lastFocusableEl = focusableEls[focusableEls.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            e.preventDefault();
                        }
                    } else if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }));
            };
            LightGallery.prototype.manageCloseGallery = function() {
                var _this = this;
                if (!this.settings.closable) return;
                var mousedown = false;
                this.getElementById("lg-close").on("click.lg", (function() {
                    _this.closeGallery();
                }));
                if (this.settings.closeOnTap) {
                    this.outer.on("mousedown.lg", (function(e) {
                        var target = $LG(e.target);
                        if (_this.isSlideElement(target)) mousedown = true; else mousedown = false;
                    }));
                    this.outer.on("mousemove.lg", (function() {
                        mousedown = false;
                    }));
                    this.outer.on("mouseup.lg", (function(e) {
                        var target = $LG(e.target);
                        if (_this.isSlideElement(target) && mousedown) if (!_this.outer.hasClass("lg-dragging")) _this.closeGallery();
                    }));
                }
            };
            LightGallery.prototype.closeGallery = function(force) {
                var _this = this;
                if (!this.lgOpened || !this.settings.closable && !force) return 0;
                this.LGel.trigger(lGEvents.beforeClose);
                if (this.settings.resetScrollPosition && !this.settings.hideScrollbar) $LG(window).scrollTop(this.prevScrollTop);
                var currentItem = this.items[this.index];
                var transform;
                if (this.zoomFromOrigin && currentItem) {
                    var _a = this.mediaContainerPosition, top_4 = _a.top, bottom = _a.bottom;
                    var _b = this.galleryItems[this.index], __slideVideoInfo = _b.__slideVideoInfo, poster = _b.poster;
                    var imageSize = utils.getSize(currentItem, this.outer, top_4 + bottom, __slideVideoInfo && poster && this.settings.videoMaxSize);
                    transform = utils.getTransform(currentItem, this.outer, top_4, bottom, imageSize);
                }
                if (this.zoomFromOrigin && transform) {
                    this.outer.addClass("lg-closing lg-zoom-from-image");
                    this.getSlideItem(this.index).addClass("lg-start-end-progress").css("transition-duration", this.settings.startAnimationDuration + "ms").css("transform", transform);
                } else {
                    this.outer.addClass("lg-hide-items");
                    this.outer.removeClass("lg-zoom-from-image");
                }
                this.destroyModules();
                this.lGalleryOn = false;
                this.isDummyImageRemoved = false;
                this.zoomFromOrigin = this.settings.zoomFromOrigin;
                clearTimeout(this.hideBarTimeout);
                this.hideBarTimeout = false;
                $LG("html").removeClass("lg-on");
                this.outer.removeClass("lg-visible lg-components-open");
                this.$backdrop.removeClass("in").css("opacity", 0);
                var removeTimeout = this.zoomFromOrigin && transform ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
                this.$container.removeClass("lg-show-in");
                setTimeout((function() {
                    if (_this.zoomFromOrigin && transform) _this.outer.removeClass("lg-zoom-from-image");
                    _this.$container.removeClass("lg-show");
                    _this.resetScrollBar();
                    _this.$backdrop.removeAttr("style").css("transition-duration", _this.settings.backdropDuration + "ms");
                    _this.outer.removeClass("lg-closing " + _this.settings.startClass);
                    _this.getSlideItem(_this.index).removeClass("lg-start-end-progress");
                    _this.$inner.empty();
                    if (_this.lgOpened) _this.LGel.trigger(lGEvents.afterClose, {
                        instance: _this
                    });
                    if (_this.$container.get()) _this.$container.get().blur();
                    _this.lgOpened = false;
                }), removeTimeout + 100);
                return removeTimeout + 100;
            };
            LightGallery.prototype.initModules = function() {
                this.plugins.forEach((function(module) {
                    try {
                        module.init();
                    } catch (err) {
                        console.warn("lightGallery:- make sure lightGallery module is properly initiated");
                    }
                }));
            };
            LightGallery.prototype.destroyModules = function(destroy) {
                this.plugins.forEach((function(module) {
                    try {
                        if (destroy) module.destroy(); else module.closeGallery && module.closeGallery();
                    } catch (err) {
                        console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
                    }
                }));
            };
            LightGallery.prototype.refresh = function(galleryItems) {
                if (!this.settings.dynamic) this.invalidateItems();
                if (galleryItems) this.galleryItems = galleryItems; else this.galleryItems = this.getItems();
                this.updateControls();
                this.openGalleryOnItemClick();
                this.LGel.trigger(lGEvents.updateSlides);
            };
            LightGallery.prototype.updateControls = function() {
                this.addSlideVideoInfo(this.galleryItems);
                this.updateCounterTotal();
                this.manageSingleSlideClassName();
            };
            LightGallery.prototype.destroyGallery = function() {
                this.destroyModules(true);
                if (!this.settings.dynamic) this.invalidateItems();
                $LG(window).off(".lg.global" + this.lgId);
                this.LGel.off(".lg");
                this.$container.remove();
            };
            LightGallery.prototype.destroy = function() {
                var closeTimeout = this.closeGallery(true);
                if (closeTimeout) setTimeout(this.destroyGallery.bind(this), closeTimeout); else this.destroyGallery();
                return closeTimeout;
            };
            return LightGallery;
        }();
        function lightGallery(el, options) {
            return new LightGallery(el, options);
        }
        const lightgallery_es5 = lightGallery;
        __webpack_require__(86);
        __webpack_require__(97);
        const galleries = document.querySelectorAll("[data-gallery]");
        if (galleries.length) {
            let galleyItems = [];
            galleries.forEach((gallery => {
                galleyItems.push({
                    gallery,
                    galleryClass: lightgallery_es5(gallery, {
                        licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
                        speed: 500
                    })
                });
            }));
            flsModules.gallery = galleyItems;
        }
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }), this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            }));
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                    return item.breakpoint === mediaBreakpoint;
                }));
                matchMedia.addListener((function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = оbjects.length - 1; i >= 0; i--) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if ("last" === place || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if ("first" === place) {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return -1;
                    if ("last" === a.place || "first" === b.place) return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                Array.prototype.sort.call(arr, (function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return 1;
                        if ("last" === a.place || "first" === b.place) return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
        /*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */
        !function(t, e) {
            "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", [ "jquery" ], (function(i) {
                return e(t, i);
            })) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
        }(window, (function(t, e) {
            "use strict";
            function i(i, s, a) {
                function u(t, e, o) {
                    var n, s = "$()." + i + '("' + e + '")';
                    return t.each((function(t, u) {
                        var h = a.data(u, i);
                        if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                        var d = h[e];
                        if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                        var l = d.apply(h, o);
                        n = void 0 === n ? l : n;
                    })), void 0 !== n ? n : t;
                }
                function h(t, e) {
                    t.each((function(t, o) {
                        var n = a.data(o, i);
                        n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n));
                    }));
                }
                a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
                    a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
                }), a.fn[i] = function(t) {
                    if ("string" == typeof t) {
                        var e = n.call(arguments, 1);
                        return u(this, t, e);
                    }
                    return h(this, t), this;
                }, o(a));
            }
            function o(t) {
                !t || t && t.bridget || (t.bridget = i);
            }
            var n = Array.prototype.slice, s = t.console, r = "undefined" == typeof s ? function() {} : function(t) {
                s.error(t);
            };
            return o(e || t.jQuery), i;
        })), function(t, e) {
            "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
        }("undefined" != typeof window ? window : void 0, (function() {
            function t() {}
            var e = t.prototype;
            return e.on = function(t, e) {
                if (t && e) {
                    var i = this._events = this._events || {}, o = i[t] = i[t] || [];
                    return -1 == o.indexOf(e) && o.push(e), this;
                }
            }, e.once = function(t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = this._onceEvents = this._onceEvents || {}, o = i[t] = i[t] || {};
                    return o[e] = !0, this;
                }
            }, e.off = function(t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var o = i.indexOf(e);
                    return -1 != o && i.splice(o, 1), this;
                }
            }, e.emitEvent = function(t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    i = i.slice(0), e = e || [];
                    for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
                        var s = i[n], r = o && o[s];
                        r && (this.off(t, s), delete o[s]), s.apply(this, e);
                    }
                    return this;
                }
            }, e.allOff = function() {
                delete this._events, delete this._onceEvents;
            }, t;
        })), function(t, e) {
            "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e();
        }(window, (function() {
            "use strict";
            function t(t) {
                var e = parseFloat(t), i = -1 == t.indexOf("%") && !isNaN(e);
                return i && e;
            }
            function e() {}
            function i() {
                for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0; e < h; e++) {
                    var i = u[e];
                    t[i] = 0;
                }
                return t;
            }
            function o(t) {
                var e = getComputedStyle(t);
                return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), 
                e;
            }
            function n() {
                if (!d) {
                    d = !0;
                    var e = document.createElement("div");
                    e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", 
                    e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
                    var i = document.body || document.documentElement;
                    i.appendChild(e);
                    var n = o(e);
                    r = 200 == Math.round(t(n.width)), s.isBoxSizeOuter = r, i.removeChild(e);
                }
            }
            function s(e) {
                if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                    var s = o(e);
                    if ("none" == s.display) return i();
                    var a = {};
                    a.width = e.offsetWidth, a.height = e.offsetHeight;
                    for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
                        var f = u[l], c = s[f], m = parseFloat(c);
                        a[f] = isNaN(m) ? 0 : m;
                    }
                    var p = a.paddingLeft + a.paddingRight, y = a.paddingTop + a.paddingBottom, g = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom, _ = a.borderLeftWidth + a.borderRightWidth, z = a.borderTopWidth + a.borderBottomWidth, I = d && r, x = t(s.width);
                    !1 !== x && (a.width = x + (I ? 0 : p + _));
                    var S = t(s.height);
                    return !1 !== S && (a.height = S + (I ? 0 : y + z)), a.innerWidth = a.width - (p + _), 
                    a.innerHeight = a.height - (y + z), a.outerWidth = a.width + g, a.outerHeight = a.height + v, 
                    a;
                }
            }
            var r, a = "undefined" == typeof console ? e : function(t) {
                console.error(t);
            }, u = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ], h = u.length, d = !1;
            return s;
        })), function(t, e) {
            "use strict";
            "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
        }(window, (function() {
            "use strict";
            var t = function() {
                var t = window.Element.prototype;
                if (t.matches) return "matches";
                if (t.matchesSelector) return "matchesSelector";
                for (var e = [ "webkit", "moz", "ms", "o" ], i = 0; i < e.length; i++) {
                    var o = e[i], n = o + "MatchesSelector";
                    if (t[n]) return n;
                }
            }();
            return function(e, i) {
                return e[t](i);
            };
        })), function(t, e) {
            "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", [ "desandro-matches-selector/matches-selector" ], (function(i) {
                return e(t, i);
            })) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
        }(window, (function(t, e) {
            var i = {};
            i.extend = function(t, e) {
                for (var i in e) t[i] = e[i];
                return t;
            }, i.modulo = function(t, e) {
                return (t % e + e) % e;
            };
            var o = Array.prototype.slice;
            i.makeArray = function(t) {
                if (Array.isArray(t)) return t;
                if (null === t || void 0 === t) return [];
                var e = "object" == typeof t && "number" == typeof t.length;
                return e ? o.call(t) : [ t ];
            }, i.removeFrom = function(t, e) {
                var i = t.indexOf(e);
                -1 != i && t.splice(i, 1);
            }, i.getParent = function(t, i) {
                for (;t.parentNode && t != document.body; ) if (t = t.parentNode, e(t, i)) return t;
            }, i.getQueryElement = function(t) {
                return "string" == typeof t ? document.querySelector(t) : t;
            }, i.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }, i.filterFindElements = function(t, o) {
                t = i.makeArray(t);
                var n = [];
                return t.forEach((function(t) {
                    if (t instanceof HTMLElement) {
                        if (!o) return void n.push(t);
                        e(t, o) && n.push(t);
                        for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s]);
                    }
                })), n;
            }, i.debounceMethod = function(t, e, i) {
                i = i || 100;
                var o = t.prototype[e], n = e + "Timeout";
                t.prototype[e] = function() {
                    var t = this[n];
                    clearTimeout(t);
                    var e = arguments, s = this;
                    this[n] = setTimeout((function() {
                        o.apply(s, e), delete s[n];
                    }), i);
                };
            }, i.docReady = function(t) {
                var e = document.readyState;
                "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
            }, i.toDashed = function(t) {
                return t.replace(/(.)([A-Z])/g, (function(t, e, i) {
                    return e + "-" + i;
                })).toLowerCase();
            };
            var n = t.console;
            return i.htmlInit = function(e, o) {
                i.docReady((function() {
                    var s = i.toDashed(o), r = "data-" + s, a = document.querySelectorAll("[" + r + "]"), u = document.querySelectorAll(".js-" + s), h = i.makeArray(a).concat(i.makeArray(u)), d = r + "-options", l = t.jQuery;
                    h.forEach((function(t) {
                        var i, s = t.getAttribute(r) || t.getAttribute(d);
                        try {
                            i = s && JSON.parse(s);
                        } catch (a) {
                            return void (n && n.error("Error parsing " + r + " on " + t.className + ": " + a));
                        }
                        var u = new e(t, i);
                        l && l.data(t, o, u);
                    }));
                }));
            }, i;
        })), function(t, e) {
            "function" == typeof define && define.amd ? define("outlayer/item", [ "ev-emitter/ev-emitter", "get-size/get-size" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, 
            t.Outlayer.Item = e(t.EvEmitter, t.getSize));
        }(window, (function(t, e) {
            "use strict";
            function i(t) {
                for (var e in t) return !1;
                return null, !0;
            }
            function o(t, e) {
                t && (this.element = t, this.layout = e, this.position = {
                    x: 0,
                    y: 0
                }, this._create());
            }
            function n(t) {
                return t.replace(/([A-Z])/g, (function(t) {
                    return "-" + t.toLowerCase();
                }));
            }
            var s = document.documentElement.style, r = "string" == typeof s.transition ? "transition" : "WebkitTransition", a = "string" == typeof s.transform ? "transform" : "WebkitTransform", u = {
                WebkitTransition: "webkitTransitionEnd",
                transition: "transitionend"
            }[r], h = {
                transform: a,
                transition: r,
                transitionDuration: r + "Duration",
                transitionProperty: r + "Property",
                transitionDelay: r + "Delay"
            }, d = o.prototype = Object.create(t.prototype);
            d.constructor = o, d._create = function() {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                }, this.css({
                    position: "absolute"
                });
            }, d.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }, d.getSize = function() {
                this.size = e(this.element);
            }, d.css = function(t) {
                var e = this.element.style;
                for (var i in t) {
                    var o = h[i] || i;
                    e[o] = t[i];
                }
            }, d.getPosition = function() {
                var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), o = t[e ? "left" : "right"], n = t[i ? "top" : "bottom"], s = parseFloat(o), r = parseFloat(n), a = this.layout.size;
                -1 != o.indexOf("%") && (s = s / 100 * a.width), -1 != n.indexOf("%") && (r = r / 100 * a.height), 
                s = isNaN(s) ? 0 : s, r = isNaN(r) ? 0 : r, s -= e ? a.paddingLeft : a.paddingRight, 
                r -= i ? a.paddingTop : a.paddingBottom, this.position.x = s, this.position.y = r;
            }, d.layoutPosition = function() {
                var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), o = this.layout._getOption("originTop"), n = i ? "paddingLeft" : "paddingRight", s = i ? "left" : "right", r = i ? "right" : "left", a = this.position.x + t[n];
                e[s] = this.getXValue(a), e[r] = "";
                var u = o ? "paddingTop" : "paddingBottom", h = o ? "top" : "bottom", d = o ? "bottom" : "top", l = this.position.y + t[u];
                e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [ this ]);
            }, d.getXValue = function(t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px";
            }, d.getYValue = function(t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px";
            }, d._transitionTo = function(t, e) {
                this.getPosition();
                var i = this.position.x, o = this.position.y, n = t == this.position.x && e == this.position.y;
                if (this.setPosition(t, e), n && !this.isTransitioning) return void this.layoutPosition();
                var s = t - i, r = e - o, a = {};
                a.transform = this.getTranslate(s, r), this.transition({
                    to: a,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                });
            }, d.getTranslate = function(t, e) {
                var i = this.layout._getOption("originLeft"), o = this.layout._getOption("originTop");
                return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)";
            }, d.goTo = function(t, e) {
                this.setPosition(t, e), this.layoutPosition();
            }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
                this.position.x = parseFloat(t), this.position.y = parseFloat(e);
            }, d._nonTransition = function(t) {
                this.css(t.to), t.isCleaning && this._removeStyles(t.to);
                for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
            }, d.transition = function(t) {
                if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
                var e = this._transn;
                for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    this.element.offsetHeight;
                    null;
                }
                this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0;
            };
            var l = "opacity," + n(a);
            d.enableTransition = function() {
                if (!this.isTransitioning) {
                    var t = this.layout.options.transitionDuration;
                    t = "number" == typeof t ? t + "ms" : t, this.css({
                        transitionProperty: l,
                        transitionDuration: t,
                        transitionDelay: this.staggerDelay || 0
                    }), this.element.addEventListener(u, this, !1);
                }
            }, d.onwebkitTransitionEnd = function(t) {
                this.ontransitionend(t);
            }, d.onotransitionend = function(t) {
                this.ontransitionend(t);
            };
            var f = {
                "-webkit-transform": "transform"
            };
            d.ontransitionend = function(t) {
                if (t.target === this.element) {
                    var e = this._transn, o = f[t.propertyName] || t.propertyName;
                    if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", 
                    delete e.clean[o]), o in e.onEnd) {
                        var n = e.onEnd[o];
                        n.call(this), delete e.onEnd[o];
                    }
                    this.emitEvent("transitionEnd", [ this ]);
                }
            }, d.disableTransition = function() {
                this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1;
            }, d._removeStyles = function(t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e);
            };
            var c = {
                transitionProperty: "",
                transitionDuration: "",
                transitionDelay: ""
            };
            return d.removeTransitionStyles = function() {
                this.css(c);
            }, d.stagger = function(t) {
                t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms";
            }, d.removeElem = function() {
                this.element.parentNode.removeChild(this.element), this.css({
                    display: ""
                }), this.emitEvent("remove", [ this ]);
            }, d.remove = function() {
                return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", (function() {
                    this.removeElem();
                })), void this.hide()) : void this.removeElem();
            }, d.reveal = function() {
                delete this.isHidden, this.css({
                    display: ""
                });
                var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle");
                e[i] = this.onRevealTransitionEnd, this.transition({
                    from: t.hiddenStyle,
                    to: t.visibleStyle,
                    isCleaning: !0,
                    onTransitionEnd: e
                });
            }, d.onRevealTransitionEnd = function() {
                this.isHidden || this.emitEvent("reveal");
            }, d.getHideRevealTransitionEndProperty = function(t) {
                var e = this.layout.options[t];
                if (e.opacity) return "opacity";
                for (var i in e) return i;
            }, d.hide = function() {
                this.isHidden = !0, this.css({
                    display: ""
                });
                var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle");
                e[i] = this.onHideTransitionEnd, this.transition({
                    from: t.visibleStyle,
                    to: t.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: e
                });
            }, d.onHideTransitionEnd = function() {
                this.isHidden && (this.css({
                    display: "none"
                }), this.emitEvent("hide"));
            }, d.destroy = function() {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                });
            }, o;
        })), function(t, e) {
            "use strict";
            "function" == typeof define && define.amd ? define("outlayer/outlayer", [ "ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item" ], (function(i, o, n, s) {
                return e(t, i, o, n, s);
            })) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item);
        }(window, (function(t, e, i, o, n) {
            "use strict";
            function s(t, e) {
                var i = o.getQueryElement(t);
                if (!i) return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
                this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), 
                this.option(e);
                var n = ++l;
                this.element.outlayerGUID = n, f[n] = this, this._create();
                var s = this._getOption("initLayout");
                s && this.layout();
            }
            function r(t) {
                function e() {
                    t.apply(this, arguments);
                }
                return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
            }
            function a(t) {
                if ("number" == typeof t) return t;
                var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], o = e && e[2];
                if (!i.length) return 0;
                i = parseFloat(i);
                var n = m[o] || 1;
                return i * n;
            }
            var u = t.console, h = t.jQuery, d = function() {}, l = 0, f = {};
            s.namespace = "outlayer", s.Item = n, s.defaults = {
                containerStyle: {
                    position: "relative"
                },
                initLayout: !0,
                originLeft: !0,
                originTop: !0,
                resize: !0,
                resizeContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            };
            var c = s.prototype;
            o.extend(c, e.prototype), c.option = function(t) {
                o.extend(this.options, t);
            }, c._getOption = function(t) {
                var e = this.constructor.compatOptions[t];
                return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
            }, s.compatOptions = {
                initLayout: "isInitLayout",
                horizontal: "isHorizontal",
                layoutInstant: "isLayoutInstant",
                originLeft: "isOriginLeft",
                originTop: "isOriginTop",
                resize: "isResizeBound",
                resizeContainer: "isResizingContainer"
            }, c._create = function() {
                this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
                var t = this._getOption("resize");
                t && this.bindResize();
            }, c.reloadItems = function() {
                this.items = this._itemize(this.element.children);
            }, c._itemize = function(t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
                    var s = e[n], r = new i(s, this);
                    o.push(r);
                }
                return o;
            }, c._filterFindItemElements = function(t) {
                return o.filterFindElements(t, this.options.itemSelector);
            }, c.getItemElements = function() {
                return this.items.map((function(t) {
                    return t.element;
                }));
            }, c.layout = function() {
                this._resetLayout(), this._manageStamps();
                var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
                this.layoutItems(this.items, e), this._isLayoutInited = !0;
            }, c._init = c.layout, c._resetLayout = function() {
                this.getSize();
            }, c.getSize = function() {
                this.size = i(this.element);
            }, c._getMeasurement = function(t, e) {
                var o, n = this.options[t];
                n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), 
                this[t] = o ? i(o)[e] : n) : this[t] = 0;
            }, c.layoutItems = function(t, e) {
                t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout();
            }, c._getItemsForLayout = function(t) {
                return t.filter((function(t) {
                    return !t.isIgnored;
                }));
            }, c._layoutItems = function(t, e) {
                if (this._emitCompleteOnItems("layout", t), t && t.length) {
                    var i = [];
                    t.forEach((function(t) {
                        var o = this._getItemLayoutPosition(t);
                        o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o);
                    }), this), this._processLayoutQueue(i);
                }
            }, c._getItemLayoutPosition = function() {
                return {
                    x: 0,
                    y: 0
                };
            }, c._processLayoutQueue = function(t) {
                this.updateStagger(), t.forEach((function(t, e) {
                    this._positionItem(t.item, t.x, t.y, t.isInstant, e);
                }), this);
            }, c.updateStagger = function() {
                var t = this.options.stagger;
                return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), 
                this.stagger);
            }, c._positionItem = function(t, e, i, o, n) {
                o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i));
            }, c._postLayout = function() {
                this.resizeContainer();
            }, c.resizeContainer = function() {
                var t = this._getOption("resizeContainer");
                if (t) {
                    var e = this._getContainerSize();
                    e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
                }
            }, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), 
                    t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px";
                }
            }, c._emitCompleteOnItems = function(t, e) {
                function i() {
                    n.dispatchEvent(t + "Complete", null, [ e ]);
                }
                function o() {
                    r++, r == s && i();
                }
                var n = this, s = e.length;
                if (!e || !s) return void i();
                var r = 0;
                e.forEach((function(e) {
                    e.once(t, o);
                }));
            }, c.dispatchEvent = function(t, e, i) {
                var o = e ? [ e ].concat(i) : i;
                if (this.emitEvent(t, o), h) if (this.$element = this.$element || h(this.element), 
                e) {
                    var n = h.Event(e);
                    n.type = t, this.$element.trigger(n, i);
                } else this.$element.trigger(t, i);
            }, c.ignore = function(t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0);
            }, c.unignore = function(t) {
                var e = this.getItem(t);
                e && delete e.isIgnored;
            }, c.stamp = function(t) {
                t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this));
            }, c.unstamp = function(t) {
                t = this._find(t), t && t.forEach((function(t) {
                    o.removeFrom(this.stamps, t), this.unignore(t);
                }), this);
            }, c._find = function(t) {
                if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t);
            }, c._manageStamps = function() {
                this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
            }, c._getBoundingRect = function() {
                var t = this.element.getBoundingClientRect(), e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
                };
            }, c._manageStamp = d, c._getElementOffset = function(t) {
                var e = t.getBoundingClientRect(), o = this._boundingRect, n = i(t), s = {
                    left: e.left - o.left - n.marginLeft,
                    top: e.top - o.top - n.marginTop,
                    right: o.right - e.right - n.marginRight,
                    bottom: o.bottom - e.bottom - n.marginBottom
                };
                return s;
            }, c.handleEvent = o.handleEvent, c.bindResize = function() {
                t.addEventListener("resize", this), this.isResizeBound = !0;
            }, c.unbindResize = function() {
                t.removeEventListener("resize", this), this.isResizeBound = !1;
            }, c.onresize = function() {
                this.resize();
            }, o.debounceMethod(s, "onresize", 100), c.resize = function() {
                this.isResizeBound && this.needsResizeLayout() && this.layout();
            }, c.needsResizeLayout = function() {
                var t = i(this.element), e = this.size && t;
                return e && t.innerWidth !== this.size.innerWidth;
            }, c.addItems = function(t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e;
            }, c.appended = function(t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e));
            }, c.prepended = function(t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), 
                    this.reveal(e), this.layoutItems(i);
                }
            }, c.reveal = function(t) {
                if (this._emitCompleteOnItems("reveal", t), t && t.length) {
                    var e = this.updateStagger();
                    t.forEach((function(t, i) {
                        t.stagger(i * e), t.reveal();
                    }));
                }
            }, c.hide = function(t) {
                if (this._emitCompleteOnItems("hide", t), t && t.length) {
                    var e = this.updateStagger();
                    t.forEach((function(t, i) {
                        t.stagger(i * e), t.hide();
                    }));
                }
            }, c.revealItemElements = function(t) {
                var e = this.getItems(t);
                this.reveal(e);
            }, c.hideItemElements = function(t) {
                var e = this.getItems(t);
                this.hide(e);
            }, c.getItem = function(t) {
                for (var e = 0; e < this.items.length; e++) {
                    var i = this.items[e];
                    if (i.element == t) return i;
                }
            }, c.getItems = function(t) {
                t = o.makeArray(t);
                var e = [];
                return t.forEach((function(t) {
                    var i = this.getItem(t);
                    i && e.push(i);
                }), this), e;
            }, c.remove = function(t) {
                var e = this.getItems(t);
                this._emitCompleteOnItems("remove", e), e && e.length && e.forEach((function(t) {
                    t.remove(), o.removeFrom(this.items, t);
                }), this);
            }, c.destroy = function() {
                var t = this.element.style;
                t.height = "", t.position = "", t.width = "", this.items.forEach((function(t) {
                    t.destroy();
                })), this.unbindResize();
                var e = this.element.outlayerGUID;
                delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace);
            }, s.data = function(t) {
                t = o.getQueryElement(t);
                var e = t && t.outlayerGUID;
                return e && f[e];
            }, s.create = function(t, e) {
                var i = r(s);
                return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), 
                i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), 
                i;
            };
            var m = {
                ms: 1,
                s: 1e3
            };
            return s.Item = n, s;
        })), function(t, e) {
            "function" == typeof define && define.amd ? define("isotope-layout/js/item", [ "outlayer/outlayer" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, 
            t.Isotope.Item = e(t.Outlayer));
        }(window, (function(t) {
            "use strict";
            function e() {
                t.Item.apply(this, arguments);
            }
            var i = e.prototype = Object.create(t.Item.prototype), o = i._create;
            i._create = function() {
                this.id = this.layout.itemGUID++, o.call(this), this.sortData = {};
            }, i.updateSortData = function() {
                if (!this.isIgnored) {
                    this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                    var t = this.layout.options.getSortData, e = this.layout._sorters;
                    for (var i in t) {
                        var o = e[i];
                        this.sortData[i] = o(this.element, this);
                    }
                }
            };
            var n = i.destroy;
            return i.destroy = function() {
                n.apply(this, arguments), this.css({
                    display: ""
                });
            }, e;
        })), function(t, e) {
            "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", [ "get-size/get-size", "outlayer/outlayer" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, 
            t.Isotope.LayoutMode = e(t.getSize, t.Outlayer));
        }(window, (function(t, e) {
            "use strict";
            function i(t) {
                this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, 
                this.items = t.filteredItems, this.size = t.size);
            }
            var o = i.prototype, n = [ "_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption" ];
            return n.forEach((function(t) {
                o[t] = function() {
                    return e.prototype[t].apply(this.isotope, arguments);
                };
            })), o.needsVerticalResizeLayout = function() {
                var e = t(this.isotope.element), i = this.isotope.size && e;
                return i && e.innerHeight != this.isotope.size.innerHeight;
            }, o._getMeasurement = function() {
                this.isotope._getMeasurement.apply(this, arguments);
            }, o.getColumnWidth = function() {
                this.getSegmentSize("column", "Width");
            }, o.getRowHeight = function() {
                this.getSegmentSize("row", "Height");
            }, o.getSegmentSize = function(t, e) {
                var i = t + e, o = "outer" + e;
                if (this._getMeasurement(i, o), !this[i]) {
                    var n = this.getFirstItemSize();
                    this[i] = n && n[o] || this.isotope.size["inner" + e];
                }
            }, o.getFirstItemSize = function() {
                var e = this.isotope.filteredItems[0];
                return e && e.element && t(e.element);
            }, o.layout = function() {
                this.isotope.layout.apply(this.isotope, arguments);
            }, o.getSize = function() {
                this.isotope.getSize(), this.size = this.isotope.size;
            }, i.modes = {}, i.create = function(t, e) {
                function n() {
                    i.apply(this, arguments);
                }
                return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), 
                n.prototype.namespace = t, i.modes[t] = n, n;
            }, i;
        })), function(t, e) {
            "function" == typeof define && define.amd ? define("masonry-layout/masonry", [ "outlayer/outlayer", "get-size/get-size" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize);
        }(window, (function(t, e) {
            var i = t.create("masonry");
            i.compatOptions.fitWidth = "isFitWidth";
            var o = i.prototype;
            return o._resetLayout = function() {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), 
                this.measureColumns(), this.colYs = [];
                for (var t = 0; t < this.cols; t++) this.colYs.push(0);
                this.maxY = 0, this.horizontalColIndex = 0;
            }, o.measureColumns = function() {
                if (this.getContainerWidth(), !this.columnWidth) {
                    var t = this.items[0], i = t && t.element;
                    this.columnWidth = i && e(i).outerWidth || this.containerWidth;
                }
                var o = this.columnWidth += this.gutter, n = this.containerWidth + this.gutter, s = n / o, r = o - n % o, a = r && r < 1 ? "round" : "floor";
                s = Math[a](s), this.cols = Math.max(s, 1);
            }, o.getContainerWidth = function() {
                var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, o = e(i);
                this.containerWidth = o && o.innerWidth;
            }, o._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth, i = e && e < 1 ? "round" : "ceil", o = Math[i](t.size.outerWidth / this.columnWidth);
                o = Math.min(o, this.cols);
                for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
                    x: this.columnWidth * s.col,
                    y: s.y
                }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;
                return r;
            }, o._getTopColPosition = function(t) {
                var e = this._getTopColGroup(t), i = Math.min.apply(Math, e);
                return {
                    col: e.indexOf(i),
                    y: i
                };
            }, o._getTopColGroup = function(t) {
                if (t < 2) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);
                return e;
            }, o._getColGroupY = function(t, e) {
                if (e < 2) return this.colYs[t];
                var i = this.colYs.slice(t, t + e);
                return Math.max.apply(Math, i);
            }, o._getHorizontalColPosition = function(t, e) {
                var i = this.horizontalColIndex % this.cols, o = t > 1 && i + t > this.cols;
                i = o ? 0 : i;
                var n = e.size.outerWidth && e.size.outerHeight;
                return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
                    col: i,
                    y: this._getColGroupY(i, t)
                };
            }, o._manageStamp = function(t) {
                var i = e(t), o = this._getElementOffset(t), n = this._getOption("originLeft"), s = n ? o.left : o.right, r = s + i.outerWidth, a = Math.floor(s / this.columnWidth);
                a = Math.max(0, a);
                var u = Math.floor(r / this.columnWidth);
                u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
                for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l]);
            }, o._getContainerSize = function() {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = {
                    height: this.maxY
                };
                return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), 
                t;
            }, o._getContainerFitWidth = function() {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
                return (this.cols - t) * this.columnWidth - this.gutter;
            }, o.needsResizeLayout = function() {
                var t = this.containerWidth;
                return this.getContainerWidth(), t != this.containerWidth;
            }, i;
        })), function(t, e) {
            "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", [ "../layout-mode", "masonry-layout/masonry" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry);
        }(window, (function(t, e) {
            "use strict";
            var i = t.create("masonry"), o = i.prototype, n = {
                _getElementOffset: !0,
                layout: !0,
                _getMeasurement: !0
            };
            for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
            var r = o.measureColumns;
            o.measureColumns = function() {
                this.items = this.isotope.filteredItems, r.call(this);
            };
            var a = o._getOption;
            return o._getOption = function(t) {
                return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments);
            }, i;
        })), function(t, e) {
            "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", [ "../layout-mode" ], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode);
        }(window, (function(t) {
            "use strict";
            var e = t.create("fitRows"), i = e.prototype;
            return i._resetLayout = function() {
                this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth");
            }, i._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = t.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter;
                0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
                var o = {
                    x: this.x,
                    y: this.y
                };
                return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, 
                o;
            }, i._getContainerSize = function() {
                return {
                    height: this.maxY
                };
            }, e;
        })), function(t, e) {
            "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", [ "../layout-mode" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode);
        }(window, (function(t) {
            "use strict";
            var e = t.create("vertical", {
                horizontalAlignment: 0
            }), i = e.prototype;
            return i._resetLayout = function() {
                this.y = 0;
            }, i._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment, i = this.y;
                return this.y += t.size.outerHeight, {
                    x: e,
                    y: i
                };
            }, i._getContainerSize = function() {
                return {
                    height: this.y
                };
            }, e;
        })), function(t, e) {
            "function" == typeof define && define.amd ? define([ "outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical" ], (function(i, o, n, s, r, a) {
                return e(t, i, o, n, s, r, a);
            })) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode);
        }(window, (function(t, e, i, o, n, s, r) {
            function a(t, e) {
                return function(i, o) {
                    for (var n = 0; n < t.length; n++) {
                        var s = t[n], r = i.sortData[s], a = o.sortData[s];
                        if (r > a || r < a) {
                            var u = void 0 !== e[s] ? e[s] : e, h = u ? 1 : -1;
                            return (r > a ? 1 : -1) * h;
                        }
                    }
                    return 0;
                };
            }
            var u = t.jQuery, h = String.prototype.trim ? function(t) {
                return t.trim();
            } : function(t) {
                return t.replace(/^\s+|\s+$/g, "");
            }, d = e.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
            d.Item = s, d.LayoutMode = r;
            var l = d.prototype;
            l._create = function() {
                this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), 
                this.modes = {}, this.filteredItems = this.items, this.sortHistory = [ "original-order" ];
                for (var t in r.modes) this._initLayoutMode(t);
            }, l.reloadItems = function() {
                this.itemGUID = 0, e.prototype.reloadItems.call(this);
            }, l._itemize = function() {
                for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
                    var o = t[i];
                    o.id = this.itemGUID++;
                }
                return this._updateItemsSortData(t), t;
            }, l._initLayoutMode = function(t) {
                var e = r.modes[t], i = this.options[t] || {};
                this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this);
            }, l.layout = function() {
                return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout();
            }, l._layout = function() {
                var t = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), 
                this._isLayoutInited = !0;
            }, l.arrange = function(t) {
                this.option(t), this._getIsInstant();
                var e = this._filter(this.items);
                this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [ e ]) : this._hideReveal(e), 
                this._sort(), this._layout();
            }, l._init = l.arrange, l._hideReveal = function(t) {
                this.reveal(t.needReveal), this.hide(t.needHide);
            }, l._getIsInstant = function() {
                var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
                return this._isInstant = e, e;
            }, l._bindArrangeComplete = function() {
                function t() {
                    e && i && o && n.dispatchEvent("arrangeComplete", null, [ n.filteredItems ]);
                }
                var e, i, o, n = this;
                this.once("layoutComplete", (function() {
                    e = !0, t();
                })), this.once("hideComplete", (function() {
                    i = !0, t();
                })), this.once("revealComplete", (function() {
                    o = !0, t();
                }));
            }, l._filter = function(t) {
                var e = this.options.filter;
                e = e || "*";
                for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
                    var a = t[r];
                    if (!a.isIgnored) {
                        var u = s(a);
                        u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a);
                    }
                }
                return {
                    matches: i,
                    needReveal: o,
                    needHide: n
                };
            }, l._getFilterTest = function(t) {
                return u && this.options.isJQueryFiltering ? function(e) {
                    return u(e.element).is(t);
                } : "function" == typeof t ? function(e) {
                    return t(e.element);
                } : function(e) {
                    return o(e.element, t);
                };
            }, l.updateSortData = function(t) {
                var e;
                t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), 
                this._updateItemsSortData(e);
            }, l._getSorters = function() {
                var t = this.options.getSortData;
                for (var e in t) {
                    var i = t[e];
                    this._sorters[e] = f(i);
                }
            }, l._updateItemsSortData = function(t) {
                for (var e = t && t.length, i = 0; e && i < e; i++) {
                    var o = t[i];
                    o.updateSortData();
                }
            };
            var f = function() {
                function t(t) {
                    if ("string" != typeof t) return t;
                    var i = h(t).split(" "), o = i[0], n = o.match(/^\[(.+)\]$/), s = n && n[1], r = e(s, o), a = d.sortDataParsers[i[1]];
                    return t = a ? function(t) {
                        return t && a(r(t));
                    } : function(t) {
                        return t && r(t);
                    };
                }
                function e(t, e) {
                    return t ? function(e) {
                        return e.getAttribute(t);
                    } : function(t) {
                        var i = t.querySelector(e);
                        return i && i.textContent;
                    };
                }
                return t;
            }();
            d.sortDataParsers = {
                parseInt: function(t) {
                    return parseInt(t, 10);
                },
                parseFloat: function(t) {
                    return parseFloat(t);
                }
            }, l._sort = function() {
                if (this.options.sortBy) {
                    var t = n.makeArray(this.options.sortBy);
                    this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
                    var e = a(this.sortHistory, this.options.sortAscending);
                    this.filteredItems.sort(e);
                }
            }, l._getIsSameSortBy = function(t) {
                for (var e = 0; e < t.length; e++) if (t[e] != this.sortHistory[e]) return !1;
                return !0;
            }, l._mode = function() {
                var t = this.options.layoutMode, e = this.modes[t];
                if (!e) throw new Error("No layout mode: " + t);
                return e.options = this.options[t], e;
            }, l._resetLayout = function() {
                e.prototype._resetLayout.call(this), this._mode()._resetLayout();
            }, l._getItemLayoutPosition = function(t) {
                return this._mode()._getItemLayoutPosition(t);
            }, l._manageStamp = function(t) {
                this._mode()._manageStamp(t);
            }, l._getContainerSize = function() {
                return this._mode()._getContainerSize();
            }, l.needsResizeLayout = function() {
                return this._mode().needsResizeLayout();
            }, l.appended = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i = this._filterRevealAdded(e);
                    this.filteredItems = this.filteredItems.concat(i);
                }
            }, l.prepended = function(t) {
                var e = this._itemize(t);
                if (e.length) {
                    this._resetLayout(), this._manageStamps();
                    var i = this._filterRevealAdded(e);
                    this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), 
                    this.items = e.concat(this.items);
                }
            }, l._filterRevealAdded = function(t) {
                var e = this._filter(t);
                return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), 
                e.matches;
            }, l.insert = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i, o, n = e.length;
                    for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
                    var s = this._filter(e).matches;
                    for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
                    for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
                    this.reveal(s);
                }
            };
            var c = l.remove;
            return l.remove = function(t) {
                t = n.makeArray(t);
                var e = this.getItems(t);
                c.call(this, t);
                for (var i = e && e.length, o = 0; i && o < i; o++) {
                    var s = e[o];
                    n.removeFrom(this.filteredItems, s);
                }
            }, l.shuffle = function() {
                for (var t = 0; t < this.items.length; t++) {
                    var e = this.items[t];
                    e.sortData.random = Math.random();
                }
                this.options.sortBy = "random", this._sort(), this._layout();
            }, l._noTransition = function(t, e) {
                var i = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var o = t.apply(this, e);
                return this.options.transitionDuration = i, o;
            }, l.getFilteredItemElements = function() {
                return this.filteredItems.map((function(t) {
                    return t.element;
                }));
            }, d;
        }));
        function _assertThisInitialized(self) {
            if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return self;
        }
        function _inheritsLoose(subClass, superClass) {
            subClass.prototype = Object.create(superClass.prototype);
            subClass.prototype.constructor = subClass;
            subClass.__proto__ = superClass;
        }
        /*!
 * GSAP 3.11.4
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/        var _suppressOverwrites, _reverting, _context, _globalTimeline, _win, _coreInitted, _doc, _coreReady, _lastRenderedFrame, _quickTween, _tickerActive, _config = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: {
                lineHeight: ""
            }
        }, _defaults = {
            duration: .5,
            overwrite: false,
            delay: 0
        }, _bigNum = 1e8, _tinyNum = 1 / _bigNum, _2PI = 2 * Math.PI, _HALF_PI = _2PI / 4, _gsID = 0, _sqrt = Math.sqrt, _cos = Math.cos, _sin = Math.sin, _isString = function _isString(value) {
            return "string" === typeof value;
        }, _isFunction = function _isFunction(value) {
            return "function" === typeof value;
        }, _isNumber = function _isNumber(value) {
            return "number" === typeof value;
        }, _isUndefined = function _isUndefined(value) {
            return "undefined" === typeof value;
        }, _isObject = function _isObject(value) {
            return "object" === typeof value;
        }, _isNotFalse = function _isNotFalse(value) {
            return false !== value;
        }, _windowExists = function _windowExists() {
            return "undefined" !== typeof window;
        }, _isFuncOrString = function _isFuncOrString(value) {
            return _isFunction(value) || _isString(value);
        }, _isTypedArray = "function" === typeof ArrayBuffer && ArrayBuffer.isView || function() {}, _isArray = Array.isArray, _strictNumExp = /(?:-?\.?\d|\.)+/gi, _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, _relExp = /[+-]=-?[.\d]+/, _delimitedValueExp = /[^,'"\[\]\s]+/gi, _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, _globals = {}, _installScope = {}, _install = function _install(scope) {
            return (_installScope = _merge(scope, _globals)) && gsap;
        }, _missingPlugin = function _missingPlugin(property, value) {
            return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
        }, _warn = function _warn(message, suppress) {
            return !suppress && console.warn(message);
        }, _addGlobal = function _addGlobal(name, obj) {
            return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
        }, _emptyFunc = function _emptyFunc() {
            return 0;
        }, _startAtRevertConfig = {
            suppressEvents: true,
            isStart: true,
            kill: false
        }, _revertConfigNoKill = {
            suppressEvents: true,
            kill: false
        }, _revertConfig = {
            suppressEvents: true
        }, _reservedProps = {}, _lazyTweens = [], _lazyLookup = {}, _plugins = {}, _effects = {}, _nextGCFrame = 30, _harnessPlugins = [], _callbackNames = "", _harness = function _harness(targets) {
            var harnessPlugin, i, target = targets[0];
            _isObject(target) || _isFunction(target) || (targets = [ targets ]);
            if (!(harnessPlugin = (target._gsap || {}).harness)) {
                i = _harnessPlugins.length;
                while (i-- && !_harnessPlugins[i].targetTest(target)) ;
                harnessPlugin = _harnessPlugins[i];
            }
            i = targets.length;
            while (i--) targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
            return targets;
        }, _getCache = function _getCache(target) {
            return target._gsap || _harness(toArray(target))[0]._gsap;
        }, _getProperty = function _getProperty(target, property, v) {
            return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
        }, _forEachName = function _forEachName(names, func) {
            return (names = names.split(",")).forEach(func) || names;
        }, _round = function _round(value) {
            return Math.round(1e5 * value) / 1e5 || 0;
        }, _roundPrecise = function _roundPrecise(value) {
            return Math.round(1e7 * value) / 1e7 || 0;
        }, _parseRelative = function _parseRelative(start, value) {
            var operator = value.charAt(0), end = parseFloat(value.substr(2));
            start = parseFloat(start);
            return "+" === operator ? start + end : "-" === operator ? start - end : "*" === operator ? start * end : start / end;
        }, _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
            var l = toFind.length, i = 0;
            for (;toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) ;
            return i < l;
        }, _lazyRender = function _lazyRender() {
            var i, tween, l = _lazyTweens.length, a = _lazyTweens.slice(0);
            _lazyLookup = {};
            _lazyTweens.length = 0;
            for (i = 0; i < l; i++) {
                tween = a[i];
                tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
            }
        }, _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
            _lazyTweens.length && !_reverting && _lazyRender();
            animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
            _lazyTweens.length && !_reverting && _lazyRender();
        }, _numericIfPossible = function _numericIfPossible(value) {
            var n = parseFloat(value);
            return (n || 0 === n) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
        }, _passThrough = function _passThrough(p) {
            return p;
        }, _setDefaults = function _setDefaults(obj, defaults) {
            for (var p in defaults) p in obj || (obj[p] = defaults[p]);
            return obj;
        }, _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
            return function(obj, defaults) {
                for (var p in defaults) p in obj || "duration" === p && excludeDuration || "ease" === p || (obj[p] = defaults[p]);
            };
        }, _merge = function _merge(base, toMerge) {
            for (var p in toMerge) base[p] = toMerge[p];
            return base;
        }, _mergeDeep = function _mergeDeep(base, toMerge) {
            for (var p in toMerge) "__proto__" !== p && "constructor" !== p && "prototype" !== p && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
            return base;
        }, _copyExcluding = function _copyExcluding(obj, excluding) {
            var p, copy = {};
            for (p in obj) p in excluding || (copy[p] = obj[p]);
            return copy;
        }, _inheritDefaults = function _inheritDefaults(vars) {
            var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
            if (_isNotFalse(vars.inherit)) while (parent) {
                func(vars, parent.vars.defaults);
                parent = parent.parent || parent._dp;
            }
            return vars;
        }, _arraysMatch = function _arraysMatch(a1, a2) {
            var i = a1.length, match = i === a2.length;
            while (match && i-- && a1[i] === a2[i]) ;
            return i < 0;
        }, _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
            if (void 0 === firstProp) firstProp = "_first";
            if (void 0 === lastProp) lastProp = "_last";
            var t, prev = parent[lastProp];
            if (sortBy) {
                t = child[sortBy];
                while (prev && prev[sortBy] > t) prev = prev._prev;
            }
            if (prev) {
                child._next = prev._next;
                prev._next = child;
            } else {
                child._next = parent[firstProp];
                parent[firstProp] = child;
            }
            if (child._next) child._next._prev = child; else parent[lastProp] = child;
            child._prev = prev;
            child.parent = child._dp = parent;
            return child;
        }, _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
            if (void 0 === firstProp) firstProp = "_first";
            if (void 0 === lastProp) lastProp = "_last";
            var prev = child._prev, next = child._next;
            if (prev) prev._next = next; else if (parent[firstProp] === child) parent[firstProp] = next;
            if (next) next._prev = prev; else if (parent[lastProp] === child) parent[lastProp] = prev;
            child._next = child._prev = child.parent = null;
        }, _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
            child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
            child._act = 0;
        }, _uncache = function _uncache(animation, child) {
            if (animation && (!child || child._end > animation._dur || child._start < 0)) {
                var a = animation;
                while (a) {
                    a._dirty = 1;
                    a = a.parent;
                }
            }
            return animation;
        }, _recacheAncestors = function _recacheAncestors(animation) {
            var parent = animation.parent;
            while (parent && parent.parent) {
                parent._dirty = 1;
                parent.totalDuration();
                parent = parent.parent;
            }
            return animation;
        }, _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
            return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
        }, _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
            return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
        }, _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
            return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
        }, _animationCycle = function _animationCycle(tTime, cycleDuration) {
            var whole = Math.floor(tTime /= cycleDuration);
            return tTime && whole === tTime ? whole - 1 : whole;
        }, _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
            return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
        }, _setEnd = function _setEnd(animation) {
            return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
        }, _alignPlayhead = function _alignPlayhead(animation, totalTime) {
            var parent = animation._dp;
            if (parent && parent.smoothChildTiming && animation._ts) {
                animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
                _setEnd(animation);
                parent._dirty || _uncache(parent, animation);
            }
            return animation;
        }, _postAddChecks = function _postAddChecks(timeline, child) {
            var t;
            if (child._time || child._initted && !child._dur) {
                t = _parentToChildTotalTime(timeline.rawTime(), child);
                if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) child.render(t, true);
            }
            if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
                if (timeline._dur < timeline.duration()) {
                    t = timeline;
                    while (t._dp) {
                        t.rawTime() >= 0 && t.totalTime(t._tTime);
                        t = t._dp;
                    }
                }
                timeline._zTime = -_tinyNum;
            }
        }, _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
            child.parent && _removeFromParent(child);
            child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
            child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
            _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);
            _isFromOrFromStart(child) || (timeline._recent = child);
            skipChecks || _postAddChecks(timeline, child);
            timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime);
            return timeline;
        }, _scrollTrigger = function _scrollTrigger(animation, trigger) {
            return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
        }, _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
            _initTween(tween, time, tTime);
            if (!tween._initted) return 1;
            if (!force && tween._pt && !_reverting && (tween._dur && false !== tween.vars.lazy || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
                _lazyTweens.push(tween);
                tween._lazy = [ tTime, suppressEvents ];
                return 1;
            }
        }, _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
            var parent = _ref.parent;
            return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
        }, _isFromOrFromStart = function _isFromOrFromStart(_ref2) {
            var data = _ref2.data;
            return "isFromStart" === data || "isStart" === data;
        }, _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
            var pt, iteration, prevIteration, prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0;
            if (repeatDelay && tween._repeat) {
                tTime = _clamp(0, tween._tDur, totalTime);
                iteration = _animationCycle(tTime, repeatDelay);
                tween._yoyo && 1 & iteration && (ratio = 1 - ratio);
                if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
                    prevRatio = 1 - ratio;
                    tween.vars.repeatRefresh && tween._initted && tween.invalidate();
                }
            }
            if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
                if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) return;
                prevIteration = tween._zTime;
                tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
                suppressEvents || (suppressEvents = totalTime && !prevIteration);
                tween.ratio = ratio;
                tween._from && (ratio = 1 - ratio);
                tween._time = 0;
                tween._tTime = tTime;
                pt = tween._pt;
                while (pt) {
                    pt.r(ratio, pt.d);
                    pt = pt._next;
                }
                totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
                tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
                tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
                if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
                    ratio && _removeFromParent(tween, 1);
                    if (!suppressEvents && !_reverting) {
                        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
                        tween._prom && tween._prom();
                    }
                }
            } else if (!tween._zTime) tween._zTime = totalTime;
        }, _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
            var child;
            if (time > prevTime) {
                child = animation._first;
                while (child && child._start <= time) {
                    if ("isPause" === child.data && child._start > prevTime) return child;
                    child = child._next;
                }
            } else {
                child = animation._last;
                while (child && child._start >= time) {
                    if ("isPause" === child.data && child._start < prevTime) return child;
                    child = child._prev;
                }
            }
        }, _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
            var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
            totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
            animation._dur = dur;
            animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
            totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
            animation.parent && _setEnd(animation);
            skipUncache || _uncache(animation.parent, animation);
            return animation;
        }, _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
            return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
        }, _zeroPosition = {
            _start: 0,
            endTime: _emptyFunc,
            totalDuration: _emptyFunc
        }, _parsePosition = function _parsePosition(animation, position, percentAnimation) {
            var i, offset, isPercent, labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur;
            if (_isString(position) && (isNaN(position) || position in labels)) {
                offset = position.charAt(0);
                isPercent = "%" === position.substr(-1);
                i = position.indexOf("=");
                if ("<" === offset || ">" === offset) {
                    i >= 0 && (position = position.replace(/=/, ""));
                    return ("<" === offset ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
                }
                if (i < 0) {
                    position in labels || (labels[position] = clippedDuration);
                    return labels[position];
                }
                offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
                if (isPercent && percentAnimation) offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
                return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
            }
            return null == position ? clippedDuration : +position;
        }, _createTweenType = function _createTweenType(type, params, timeline) {
            var irVars, parent, isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex];
            isLegacy && (vars.duration = params[1]);
            vars.parent = timeline;
            if (type) {
                irVars = vars;
                parent = timeline;
                while (parent && !("immediateRender" in irVars)) {
                    irVars = parent.vars.defaults || {};
                    parent = _isNotFalse(parent.vars.inherit) && parent.parent;
                }
                vars.immediateRender = _isNotFalse(irVars.immediateRender);
                type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
            }
            return new Tween(params[0], vars, params[varsIndex + 1]);
        }, _conditionalReturn = function _conditionalReturn(value, func) {
            return value || 0 === value ? func(value) : func;
        }, _clamp = function _clamp(min, max, value) {
            return value < min ? min : value > max ? max : value;
        }, getUnit = function getUnit(value, v) {
            return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
        }, clamp = function clamp(min, max, value) {
            return _conditionalReturn(value, (function(v) {
                return _clamp(min, max, v);
            }));
        }, _slice = [].slice, _isArrayLike = function _isArrayLike(value, nonEmpty) {
            return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
        }, _flatten = function _flatten(ar, leaveStrings, accumulator) {
            if (void 0 === accumulator) accumulator = [];
            return ar.forEach((function(value) {
                var _accumulator;
                return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
            })) || accumulator;
        }, toArray = function toArray(value, scope, leaveStrings) {
            return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [ value ] : [];
        }, selector = function selector(value) {
            value = toArray(value)[0] || _warn("Invalid scope") || {};
            return function(v) {
                var el = value.current || value.nativeElement || value;
                return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
            };
        }, shuffle = function shuffle(a) {
            return a.sort((function() {
                return .5 - Math.random();
            }));
        }, distribute = function distribute(v) {
            if (_isFunction(v)) return v;
            var vars = _isObject(v) ? v : {
                each: v
            }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
            if (_isString(from)) ratioX = ratioY = {
                center: .5,
                edges: .5,
                end: 1
            }[from] || 0; else if (!isDecimal && ratios) {
                ratioX = from[0];
                ratioY = from[1];
            }
            return function(i, target, a) {
                var originX, originY, x, y, d, j, max, min, wrapAt, l = (a || vars).length, distances = cache[l];
                if (!distances) {
                    wrapAt = "auto" === vars.grid ? 0 : (vars.grid || [ 1, _bigNum ])[1];
                    if (!wrapAt) {
                        max = -_bigNum;
                        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) ;
                        wrapAt--;
                    }
                    distances = cache[l] = [];
                    originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
                    originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
                    max = 0;
                    min = _bigNum;
                    for (j = 0; j < l; j++) {
                        x = j % wrapAt - originX;
                        y = originY - (j / wrapAt | 0);
                        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs("y" === axis ? y : x);
                        d > max && (max = d);
                        d < min && (min = d);
                    }
                    "random" === from && shuffle(distances);
                    distances.max = max - min;
                    distances.min = min;
                    distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : "y" === axis ? l / wrapAt : wrapAt) || 0) * ("edges" === from ? -1 : 1);
                    distances.b = l < 0 ? base - l : base;
                    distances.u = getUnit(vars.amount || vars.each) || 0;
                    ease = ease && l < 0 ? _invertEase(ease) : ease;
                }
                l = (distances[i] - distances.min) / distances.max || 0;
                return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
            };
        }, _roundModifier = function _roundModifier(v) {
            var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
            return function(raw) {
                var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
                return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
            };
        }, snap = function snap(snapTo, value) {
            var radius, is2D, isArray = _isArray(snapTo);
            if (!isArray && _isObject(snapTo)) {
                radius = isArray = snapTo.radius || _bigNum;
                if (snapTo.values) {
                    snapTo = toArray(snapTo.values);
                    if (is2D = !_isNumber(snapTo[0])) radius *= radius;
                } else snapTo = _roundModifier(snapTo.increment);
            }
            return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
                is2D = snapTo(raw);
                return Math.abs(is2D - raw) <= radius ? is2D : raw;
            } : function(raw) {
                var dx, dy, x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i = snapTo.length;
                while (i--) {
                    if (is2D) {
                        dx = snapTo[i].x - x;
                        dy = snapTo[i].y - y;
                        dx = dx * dx + dy * dy;
                    } else dx = Math.abs(snapTo[i] - x);
                    if (dx < min) {
                        min = dx;
                        closest = i;
                    }
                }
                closest = !radius || min <= radius ? snapTo[closest] : raw;
                return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
            });
        }, random = function random(min, max, roundingIncrement, returnFunction) {
            return _conditionalReturn(_isArray(min) ? !max : true === roundingIncrement ? !!(roundingIncrement = 0) : !returnFunction, (function() {
                return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + .99 * roundingIncrement)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
            }));
        }, pipe = function pipe() {
            for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) functions[_key] = arguments[_key];
            return function(value) {
                return functions.reduce((function(v, f) {
                    return f(v);
                }), value);
            };
        }, unitize = function unitize(func, unit) {
            return function(value) {
                return func(parseFloat(value)) + (unit || getUnit(value));
            };
        }, normalize = function normalize(min, max, value) {
            return mapRange(min, max, 0, 1, value);
        }, _wrapArray = function _wrapArray(a, wrapper, value) {
            return _conditionalReturn(value, (function(index) {
                return a[~~wrapper(index)];
            }));
        }, wrap = function wrap(min, max, value) {
            var range = max - min;
            return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, (function(value) {
                return (range + (value - min) % range) % range + min;
            }));
        }, wrapYoyo = function wrapYoyo(min, max, value) {
            var range = max - min, total = 2 * range;
            return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, (function(value) {
                value = (total + (value - min) % total) % total || 0;
                return min + (value > range ? total - value : value);
            }));
        }, _replaceRandom = function _replaceRandom(value) {
            var i, nums, end, isArray, prev = 0, s = "";
            while (~(i = value.indexOf("random(", prev))) {
                end = value.indexOf(")", i);
                isArray = "[" === value.charAt(i + 7);
                nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
                s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
                prev = end + 1;
            }
            return s + value.substr(prev, value.length - prev);
        }, mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
            var inRange = inMax - inMin, outRange = outMax - outMin;
            return _conditionalReturn(value, (function(value) {
                return outMin + ((value - inMin) / inRange * outRange || 0);
            }));
        }, interpolate = function interpolate(start, end, progress, mutate) {
            var func = isNaN(start + end) ? 0 : function(p) {
                return (1 - p) * start + p * end;
            };
            if (!func) {
                var p, i, interpolators, l, il, isString = _isString(start), master = {};
                true === progress && (mutate = 1) && (progress = null);
                if (isString) {
                    start = {
                        p: start
                    };
                    end = {
                        p: end
                    };
                } else if (_isArray(start) && !_isArray(end)) {
                    interpolators = [];
                    l = start.length;
                    il = l - 2;
                    for (i = 1; i < l; i++) interpolators.push(interpolate(start[i - 1], start[i]));
                    l--;
                    func = function func(p) {
                        p *= l;
                        var i = Math.min(il, ~~p);
                        return interpolators[i](p - i);
                    };
                    progress = end;
                } else if (!mutate) start = _merge(_isArray(start) ? [] : {}, start);
                if (!interpolators) {
                    for (p in end) _addPropTween.call(master, start, p, "get", end[p]);
                    func = function func(p) {
                        return _renderPropTweens(p, master) || (isString ? start.p : start);
                    };
                }
            }
            return _conditionalReturn(progress, func);
        }, _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
            var p, distance, label, labels = timeline.labels, min = _bigNum;
            for (p in labels) {
                distance = labels[p] - fromTime;
                if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
                    label = p;
                    min = distance;
                }
            }
            return label;
        }, _callback = function _callback(animation, type, executeLazyFirst) {
            var params, scope, result, v = animation.vars, callback = v[type], prevContext = _context, context = animation._ctx;
            if (!callback) return;
            params = v[type + "Params"];
            scope = v.callbackScope || animation;
            executeLazyFirst && _lazyTweens.length && _lazyRender();
            context && (_context = context);
            result = params ? callback.apply(scope, params) : callback.call(scope);
            _context = prevContext;
            return result;
        }, _interrupt = function _interrupt(animation) {
            _removeFromParent(animation);
            animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
            animation.progress() < 1 && _callback(animation, "onInterrupt");
            return animation;
        }, _createPlugin = function _createPlugin(config) {
            config = !config.name && config["default"] || config;
            var name = config.name, isFunc = _isFunction(config), Plugin = name && !isFunc && config.init ? function() {
                this._props = [];
            } : config, instanceDefaults = {
                init: _emptyFunc,
                render: _renderPropTweens,
                add: _addPropTween,
                kill: _killPropTweensOf,
                modifier: _addPluginModifier,
                rawVars: 0
            }, statics = {
                targetTest: 0,
                get: 0,
                getSetter: _getSetter,
                aliases: {},
                register: 0
            };
            _wake();
            if (config !== Plugin) {
                if (_plugins[name]) return;
                _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics));
                _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics)));
                _plugins[Plugin.prop = name] = Plugin;
                if (config.targetTest) {
                    _harnessPlugins.push(Plugin);
                    _reservedProps[name] = 1;
                }
                name = ("css" === name ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
            }
            _addGlobal(name, Plugin);
            config.register && config.register(gsap, Plugin, PropTween);
        }, _255 = 255, _colorLookup = {
            aqua: [ 0, _255, _255 ],
            lime: [ 0, _255, 0 ],
            silver: [ 192, 192, 192 ],
            black: [ 0, 0, 0 ],
            maroon: [ 128, 0, 0 ],
            teal: [ 0, 128, 128 ],
            blue: [ 0, 0, _255 ],
            navy: [ 0, 0, 128 ],
            white: [ _255, _255, _255 ],
            olive: [ 128, 128, 0 ],
            yellow: [ _255, _255, 0 ],
            orange: [ _255, 165, 0 ],
            gray: [ 128, 128, 128 ],
            purple: [ 128, 0, 128 ],
            green: [ 0, 128, 0 ],
            red: [ _255, 0, 0 ],
            pink: [ _255, 192, 203 ],
            cyan: [ 0, _255, _255 ],
            transparent: [ _255, _255, _255, 0 ]
        }, _hue = function _hue(h, m1, m2) {
            h += h < 0 ? 1 : h > 1 ? -1 : 0;
            return (6 * h < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : 3 * h < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
        }, splitColor = function splitColor(v, toHSL, forceAlpha) {
            var r, g, b, h, s, l, max, min, d, wasHSL, a = !v ? _colorLookup.black : _isNumber(v) ? [ v >> 16, v >> 8 & _255, v & _255 ] : 0;
            if (!a) {
                if ("," === v.substr(-1)) v = v.substr(0, v.length - 1);
                if (_colorLookup[v]) a = _colorLookup[v]; else if ("#" === v.charAt(0)) {
                    if (v.length < 6) {
                        r = v.charAt(1);
                        g = v.charAt(2);
                        b = v.charAt(3);
                        v = "#" + r + r + g + g + b + b + (5 === v.length ? v.charAt(4) + v.charAt(4) : "");
                    }
                    if (9 === v.length) {
                        a = parseInt(v.substr(1, 6), 16);
                        return [ a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255 ];
                    }
                    v = parseInt(v.substr(1), 16);
                    a = [ v >> 16, v >> 8 & _255, v & _255 ];
                } else if ("hsl" === v.substr(0, 3)) {
                    a = wasHSL = v.match(_strictNumExp);
                    if (!toHSL) {
                        h = +a[0] % 360 / 360;
                        s = +a[1] / 100;
                        l = +a[2] / 100;
                        g = l <= .5 ? l * (s + 1) : l + s - l * s;
                        r = 2 * l - g;
                        a.length > 3 && (a[3] *= 1);
                        a[0] = _hue(h + 1 / 3, r, g);
                        a[1] = _hue(h, r, g);
                        a[2] = _hue(h - 1 / 3, r, g);
                    } else if (~v.indexOf("=")) {
                        a = v.match(_numExp);
                        forceAlpha && a.length < 4 && (a[3] = 1);
                        return a;
                    }
                } else a = v.match(_strictNumExp) || _colorLookup.transparent;
                a = a.map(Number);
            }
            if (toHSL && !wasHSL) {
                r = a[0] / _255;
                g = a[1] / _255;
                b = a[2] / _255;
                max = Math.max(r, g, b);
                min = Math.min(r, g, b);
                l = (max + min) / 2;
                if (max === min) h = s = 0; else {
                    d = max - min;
                    s = l > .5 ? d / (2 - max - min) : d / (max + min);
                    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
                    h *= 60;
                }
                a[0] = ~~(h + .5);
                a[1] = ~~(100 * s + .5);
                a[2] = ~~(100 * l + .5);
            }
            forceAlpha && a.length < 4 && (a[3] = 1);
            return a;
        }, _colorOrderData = function _colorOrderData(v) {
            var values = [], c = [], i = -1;
            v.split(_colorExp).forEach((function(v) {
                var a = v.match(_numWithUnitExp) || [];
                values.push.apply(values, a);
                c.push(i += a.length + 1);
            }));
            values.c = c;
            return values;
        }, _formatColors = function _formatColors(s, toHSL, orderMatchData) {
            var c, shell, d, l, result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0;
            if (!colors) return s;
            colors = colors.map((function(color) {
                return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
            }));
            if (orderMatchData) {
                d = _colorOrderData(s);
                c = orderMatchData.c;
                if (c.join(result) !== d.c.join(result)) {
                    shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
                    l = shell.length - 1;
                    for (;i < l; i++) result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
                }
            }
            if (!shell) {
                shell = s.split(_colorExp);
                l = shell.length - 1;
                for (;i < l; i++) result += shell[i] + colors[i];
            }
            return result + shell[l];
        }, _colorExp = function() {
            var p, s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
            for (p in _colorLookup) s += "|" + p + "\\b";
            return new RegExp(s + ")", "gi");
        }(), _hslExp = /hsl[a]?\(/, _colorStringFilter = function _colorStringFilter(a) {
            var toHSL, combined = a.join(" ");
            _colorExp.lastIndex = 0;
            if (_colorExp.test(combined)) {
                toHSL = _hslExp.test(combined);
                a[1] = _formatColors(a[1], toHSL);
                a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
                return true;
            }
        }, _ticker = function() {
            var _id, _req, _raf, _self, _delta, _i, _getTime = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners = [], _tick = function _tick(v) {
                var overlap, dispatch, time, frame, elapsed = _getTime() - _lastUpdate, manual = true === v;
                elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
                _lastUpdate += elapsed;
                time = _lastUpdate - _startTime;
                overlap = time - _nextTime;
                if (overlap > 0 || manual) {
                    frame = ++_self.frame;
                    _delta = time - 1e3 * _self.time;
                    _self.time = time /= 1e3;
                    _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
                    dispatch = 1;
                }
                manual || (_id = _req(_tick));
                if (dispatch) for (_i = 0; _i < _listeners.length; _i++) _listeners[_i](time, _delta, frame, v);
            };
            _self = {
                time: 0,
                frame: 0,
                tick: function tick() {
                    _tick(true);
                },
                deltaRatio: function deltaRatio(fps) {
                    return _delta / (1e3 / (fps || 60));
                },
                wake: function wake() {
                    if (_coreReady) {
                        if (!_coreInitted && _windowExists()) {
                            _win = _coreInitted = window;
                            _doc = _win.document || {};
                            _globals.gsap = gsap;
                            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
                            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
                            _raf = _win.requestAnimationFrame;
                        }
                        _id && _self.sleep();
                        _req = _raf || function(f) {
                            return setTimeout(f, _nextTime - 1e3 * _self.time + 1 | 0);
                        };
                        _tickerActive = 1;
                        _tick(2);
                    }
                },
                sleep: function sleep() {
                    (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
                    _tickerActive = 0;
                    _req = _emptyFunc;
                },
                lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
                    _lagThreshold = threshold || 1 / 0;
                    _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
                },
                fps: function fps(_fps) {
                    _gap = 1e3 / (_fps || 240);
                    _nextTime = 1e3 * _self.time + _gap;
                },
                add: function add(callback, once, prioritize) {
                    var func = once ? function(t, d, f, v) {
                        callback(t, d, f, v);
                        _self.remove(func);
                    } : callback;
                    _self.remove(callback);
                    _listeners[prioritize ? "unshift" : "push"](func);
                    _wake();
                    return func;
                },
                remove: function remove(callback, i) {
                    ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
                },
                _listeners
            };
            return _self;
        }(), _wake = function _wake() {
            return !_tickerActive && _ticker.wake();
        }, _easeMap = {}, _customEaseExp = /^[\d.\-M][\d.\-,\s]/, _quotesExp = /["']/g, _parseObjectInString = function _parseObjectInString(value) {
            var index, val, parsedVal, obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length;
            for (;i < l; i++) {
                val = split[i];
                index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
                parsedVal = val.substr(0, index);
                obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
                key = val.substr(index + 1).trim();
            }
            return obj;
        }, _valueInParentheses = function _valueInParentheses(value) {
            var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
            return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
        }, _configEaseFromString = function _configEaseFromString(name) {
            var split = (name + "").split("("), ease = _easeMap[split[0]];
            return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [ _parseObjectInString(split[1]) ] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
        }, _invertEase = function _invertEase(ease) {
            return function(p) {
                return 1 - ease(1 - p);
            };
        }, _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
            var ease, child = timeline._first;
            while (child) {
                if (child instanceof Timeline) _propagateYoyoEase(child, isYoyo); else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) if (child.timeline) _propagateYoyoEase(child.timeline, isYoyo); else {
                    ease = child._ease;
                    child._ease = child._yEase;
                    child._yEase = ease;
                    child._yoyo = isYoyo;
                }
                child = child._next;
            }
        }, _parseEase = function _parseEase(ease, defaultEase) {
            return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
        }, _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
            if (void 0 === easeOut) easeOut = function easeOut(p) {
                return 1 - easeIn(1 - p);
            };
            if (void 0 === easeInOut) easeInOut = function easeInOut(p) {
                return p < .5 ? easeIn(2 * p) / 2 : 1 - easeIn(2 * (1 - p)) / 2;
            };
            var lowercaseName, ease = {
                easeIn,
                easeOut,
                easeInOut
            };
            _forEachName(names, (function(name) {
                _easeMap[name] = _globals[name] = ease;
                _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
                for (var p in ease) _easeMap[lowercaseName + ("easeIn" === p ? ".in" : "easeOut" === p ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
            }));
            return ease;
        }, _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
            return function(p) {
                return p < .5 ? (1 - easeOut(1 - 2 * p)) / 2 : .5 + easeOut(2 * (p - .5)) / 2;
            };
        }, _configElastic = function _configElastic(type, amplitude, period) {
            var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut(p) {
                return 1 === p ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
            }, ease = "out" === type ? easeOut : "in" === type ? function(p) {
                return 1 - easeOut(1 - p);
            } : _easeInOutFromOut(easeOut);
            p2 = _2PI / p2;
            ease.config = function(amplitude, period) {
                return _configElastic(type, amplitude, period);
            };
            return ease;
        }, _configBack = function _configBack(type, overshoot) {
            if (void 0 === overshoot) overshoot = 1.70158;
            var easeOut = function easeOut(p) {
                return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
            }, ease = "out" === type ? easeOut : "in" === type ? function(p) {
                return 1 - easeOut(1 - p);
            } : _easeInOutFromOut(easeOut);
            ease.config = function(overshoot) {
                return _configBack(type, overshoot);
            };
            return ease;
        };
        _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", (function(name, i) {
            var power = i < 5 ? i + 1 : i;
            _insertEase(name + ",Power" + (power - 1), i ? function(p) {
                return Math.pow(p, power);
            } : function(p) {
                return p;
            }, (function(p) {
                return 1 - Math.pow(1 - p, power);
            }), (function(p) {
                return p < .5 ? Math.pow(2 * p, power) / 2 : 1 - Math.pow(2 * (1 - p), power) / 2;
            }));
        }));
        _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
        _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
        (function(n, c) {
            var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut(p) {
                return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
            };
            _insertEase("Bounce", (function(p) {
                return 1 - easeOut(1 - p);
            }), easeOut);
        })(7.5625, 2.75);
        _insertEase("Expo", (function(p) {
            return p ? Math.pow(2, 10 * (p - 1)) : 0;
        }));
        _insertEase("Circ", (function(p) {
            return -(_sqrt(1 - p * p) - 1);
        }));
        _insertEase("Sine", (function(p) {
            return 1 === p ? 1 : -_cos(p * _HALF_PI) + 1;
        }));
        _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
        _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
            config: function config(steps, immediateStart) {
                if (void 0 === steps) steps = 1;
                var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
                return function(p) {
                    return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
                };
            }
        };
        _defaults.ease = _easeMap["quad.out"];
        _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(name) {
            return _callbackNames += name + "," + name + "Params,";
        }));
        var GSCache = function GSCache(target, harness) {
            this.id = _gsID++;
            target._gsap = this;
            this.target = target;
            this.harness = harness;
            this.get = harness ? harness.get : _getProperty;
            this.set = harness ? harness.getSetter : _getSetter;
        };
        var Animation = function() {
            function Animation(vars) {
                this.vars = vars;
                this._delay = +vars.delay || 0;
                if (this._repeat = vars.repeat === 1 / 0 ? -2 : vars.repeat || 0) {
                    this._rDelay = vars.repeatDelay || 0;
                    this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
                }
                this._ts = 1;
                _setDuration(this, +vars.duration, 1, 1);
                this.data = vars.data;
                if (_context) {
                    this._ctx = _context;
                    _context.data.push(this);
                }
                _tickerActive || _ticker.wake();
            }
            var _proto = Animation.prototype;
            _proto.delay = function delay(value) {
                if (value || 0 === value) {
                    this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
                    this._delay = value;
                    return this;
                }
                return this._delay;
            };
            _proto.duration = function duration(value) {
                return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
            };
            _proto.totalDuration = function totalDuration(value) {
                if (!arguments.length) return this._tDur;
                this._dirty = 0;
                return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
            };
            _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
                _wake();
                if (!arguments.length) return this._tTime;
                var parent = this._dp;
                if (parent && parent.smoothChildTiming && this._ts) {
                    _alignPlayhead(this, _totalTime);
                    !parent._dp || parent.parent || _postAddChecks(parent, this);
                    while (parent && parent.parent) {
                        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) parent.totalTime(parent._tTime, true);
                        parent = parent.parent;
                    }
                    if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) _addToTimeline(this._dp, this, this._start - this._delay);
                }
                if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
                    this._ts || (this._pTime = _totalTime);
                    _lazySafeRender(this, _totalTime, suppressEvents);
                }
                return this;
            };
            _proto.time = function time(value, suppressEvents) {
                return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
            };
            _proto.totalProgress = function totalProgress(value, suppressEvents) {
                return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
            };
            _proto.progress = function progress(value, suppressEvents) {
                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(1 & this.iteration()) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
            };
            _proto.iteration = function iteration(value, suppressEvents) {
                var cycleDuration = this.duration() + this._rDelay;
                return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
            };
            _proto.timeScale = function timeScale(value) {
                if (!arguments.length) return this._rts === -_tinyNum ? 0 : this._rts;
                if (this._rts === value) return this;
                var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
                this._rts = +value || 0;
                this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
                this.totalTime(_clamp(-this._delay, this._tDur, tTime), true);
                _setEnd(this);
                return _recacheAncestors(this);
            };
            _proto.paused = function paused(value) {
                if (!arguments.length) return this._ps;
                if (this._ps !== value) {
                    this._ps = value;
                    if (value) {
                        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
                        this._ts = this._act = 0;
                    } else {
                        _wake();
                        this._ts = this._rts;
                        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
                    }
                }
                return this;
            };
            _proto.startTime = function startTime(value) {
                if (arguments.length) {
                    this._start = value;
                    var parent = this.parent || this._dp;
                    parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
                    return this;
                }
                return this._start;
            };
            _proto.endTime = function endTime(includeRepeats) {
                return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
            };
            _proto.rawTime = function rawTime(wrapRepeats) {
                var parent = this.parent || this._dp;
                return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
            };
            _proto.revert = function revert(config) {
                if (void 0 === config) config = _revertConfig;
                var prevIsReverting = _reverting;
                _reverting = config;
                if (this._initted || this._startAt) {
                    this.timeline && this.timeline.revert(config);
                    this.totalTime(-.01, config.suppressEvents);
                }
                "nested" !== this.data && false !== config.kill && this.kill();
                _reverting = prevIsReverting;
                return this;
            };
            _proto.globalTime = function globalTime(rawTime) {
                var animation = this, time = arguments.length ? rawTime : animation.rawTime();
                while (animation) {
                    time = animation._start + time / (animation._ts || 1);
                    animation = animation._dp;
                }
                return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(rawTime) : time;
            };
            _proto.repeat = function repeat(value) {
                if (arguments.length) {
                    this._repeat = value === 1 / 0 ? -2 : value;
                    return _onUpdateTotalDuration(this);
                }
                return -2 === this._repeat ? 1 / 0 : this._repeat;
            };
            _proto.repeatDelay = function repeatDelay(value) {
                if (arguments.length) {
                    var time = this._time;
                    this._rDelay = value;
                    _onUpdateTotalDuration(this);
                    return time ? this.time(time) : this;
                }
                return this._rDelay;
            };
            _proto.yoyo = function yoyo(value) {
                if (arguments.length) {
                    this._yoyo = value;
                    return this;
                }
                return this._yoyo;
            };
            _proto.seek = function seek(position, suppressEvents) {
                return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
            };
            _proto.restart = function restart(includeDelay, suppressEvents) {
                return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
            };
            _proto.play = function play(from, suppressEvents) {
                null != from && this.seek(from, suppressEvents);
                return this.reversed(false).paused(false);
            };
            _proto.reverse = function reverse(from, suppressEvents) {
                null != from && this.seek(from || this.totalDuration(), suppressEvents);
                return this.reversed(true).paused(false);
            };
            _proto.pause = function pause(atTime, suppressEvents) {
                null != atTime && this.seek(atTime, suppressEvents);
                return this.paused(true);
            };
            _proto.resume = function resume() {
                return this.paused(false);
            };
            _proto.reversed = function reversed(value) {
                if (arguments.length) {
                    !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
                    return this;
                }
                return this._rts < 0;
            };
            _proto.invalidate = function invalidate() {
                this._initted = this._act = 0;
                this._zTime = -_tinyNum;
                return this;
            };
            _proto.isActive = function isActive() {
                var rawTime, parent = this.parent || this._dp, start = this._start;
                return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
            };
            _proto.eventCallback = function eventCallback(type, callback, params) {
                var vars = this.vars;
                if (arguments.length > 1) {
                    if (!callback) delete vars[type]; else {
                        vars[type] = callback;
                        params && (vars[type + "Params"] = params);
                        "onUpdate" === type && (this._onUpdate = callback);
                    }
                    return this;
                }
                return vars[type];
            };
            _proto.then = function then(onFulfilled) {
                var self = this;
                return new Promise((function(resolve) {
                    var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve() {
                        var _then = self.then;
                        self.then = null;
                        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
                        resolve(f);
                        self.then = _then;
                    };
                    if (self._initted && 1 === self.totalProgress() && self._ts >= 0 || !self._tTime && self._ts < 0) _resolve(); else self._prom = _resolve;
                }));
            };
            _proto.kill = function kill() {
                _interrupt(this);
            };
            return Animation;
        }();
        _setDefaults(Animation.prototype, {
            _time: 0,
            _start: 0,
            _end: 0,
            _tTime: 0,
            _tDur: 0,
            _dirty: 0,
            _repeat: 0,
            _yoyo: false,
            parent: null,
            _initted: false,
            _rDelay: 0,
            _ts: 1,
            _dp: 0,
            ratio: 0,
            _zTime: -_tinyNum,
            _prom: 0,
            _ps: false,
            _rts: 1
        });
        var Timeline = function(_Animation) {
            _inheritsLoose(Timeline, _Animation);
            function Timeline(vars, position) {
                var _this;
                if (void 0 === vars) vars = {};
                _this = _Animation.call(this, vars) || this;
                _this.labels = {};
                _this.smoothChildTiming = !!vars.smoothChildTiming;
                _this.autoRemoveChildren = !!vars.autoRemoveChildren;
                _this._sort = _isNotFalse(vars.sortChildren);
                _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
                vars.reversed && _this.reverse();
                vars.paused && _this.paused(true);
                vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
                return _this;
            }
            var _proto2 = Timeline.prototype;
            _proto2.to = function to(targets, vars, position) {
                _createTweenType(0, arguments, this);
                return this;
            };
            _proto2.from = function from(targets, vars, position) {
                _createTweenType(1, arguments, this);
                return this;
            };
            _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
                _createTweenType(2, arguments, this);
                return this;
            };
            _proto2.set = function set(targets, vars, position) {
                vars.duration = 0;
                vars.parent = this;
                _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
                vars.immediateRender = !!vars.immediateRender;
                new Tween(targets, vars, _parsePosition(this, position), 1);
                return this;
            };
            _proto2.call = function call(callback, params, position) {
                return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
            };
            _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
                vars.duration = duration;
                vars.stagger = vars.stagger || stagger;
                vars.onComplete = onCompleteAll;
                vars.onCompleteParams = onCompleteAllParams;
                vars.parent = this;
                new Tween(targets, vars, _parsePosition(this, position));
                return this;
            };
            _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
                vars.runBackwards = 1;
                _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
                return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
            };
            _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
                toVars.startAt = fromVars;
                _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
                return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
            };
            _proto2.render = function render(totalTime, suppressEvents, force) {
                var time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo, prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur);
                this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
                if (tTime !== this._tTime || force || crossingStart) {
                    if (prevTime !== this._time && dur) {
                        tTime += this._time - prevTime;
                        totalTime += this._time - prevTime;
                    }
                    time = tTime;
                    prevStart = this._start;
                    timeScale = this._ts;
                    prevPaused = !timeScale;
                    if (crossingStart) {
                        dur || (prevTime = this._zTime);
                        (totalTime || !suppressEvents) && (this._zTime = totalTime);
                    }
                    if (this._repeat) {
                        yoyo = this._yoyo;
                        cycleDuration = dur + this._rDelay;
                        if (this._repeat < -1 && totalTime < 0) return this.totalTime(100 * cycleDuration + totalTime, suppressEvents, force);
                        time = _roundPrecise(tTime % cycleDuration);
                        if (tTime === tDur) {
                            iteration = this._repeat;
                            time = dur;
                        } else {
                            iteration = ~~(tTime / cycleDuration);
                            if (iteration && iteration === tTime / cycleDuration) {
                                time = dur;
                                iteration--;
                            }
                            time > dur && (time = dur);
                        }
                        prevIteration = _animationCycle(this._tTime, cycleDuration);
                        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration);
                        if (yoyo && 1 & iteration) {
                            time = dur - time;
                            isYoyo = 1;
                        }
                        if (iteration !== prevIteration && !this._lock) {
                            var rewinding = yoyo && 1 & prevIteration, doesWrap = rewinding === (yoyo && 1 & iteration);
                            iteration < prevIteration && (rewinding = !rewinding);
                            prevTime = rewinding ? 0 : dur;
                            this._lock = 1;
                            this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
                            this._tTime = tTime;
                            !suppressEvents && this.parent && _callback(this, "onRepeat");
                            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
                            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
                            dur = this._dur;
                            tDur = this._tDur;
                            if (doesWrap) {
                                this._lock = 2;
                                prevTime = rewinding ? dur : -1e-4;
                                this.render(prevTime, true);
                                this.vars.repeatRefresh && !isYoyo && this.invalidate();
                            }
                            this._lock = 0;
                            if (!this._ts && !prevPaused) return this;
                            _propagateYoyoEase(this, isYoyo);
                        }
                    }
                    if (this._hasPause && !this._forcing && this._lock < 2) {
                        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
                        if (pauseTween) tTime -= time - (time = pauseTween._start);
                    }
                    this._tTime = tTime;
                    this._time = time;
                    this._act = !timeScale;
                    if (!this._initted) {
                        this._onUpdate = this.vars.onUpdate;
                        this._initted = 1;
                        this._zTime = totalTime;
                        prevTime = 0;
                    }
                    if (!prevTime && time && !suppressEvents) {
                        _callback(this, "onStart");
                        if (this._tTime !== tTime) return this;
                    }
                    if (time >= prevTime && totalTime >= 0) {
                        child = this._first;
                        while (child) {
                            next = child._next;
                            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
                                if (child.parent !== this) return this.render(totalTime, suppressEvents, force);
                                child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
                                if (time !== this._time || !this._ts && !prevPaused) {
                                    pauseTween = 0;
                                    next && (tTime += this._zTime = -_tinyNum);
                                    break;
                                }
                            }
                            child = next;
                        }
                    } else {
                        child = this._last;
                        var adjustedTime = totalTime < 0 ? totalTime : time;
                        while (child) {
                            next = child._prev;
                            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
                                if (child.parent !== this) return this.render(totalTime, suppressEvents, force);
                                child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt));
                                if (time !== this._time || !this._ts && !prevPaused) {
                                    pauseTween = 0;
                                    next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                                    break;
                                }
                            }
                            child = next;
                        }
                    }
                    if (pauseTween && !suppressEvents) {
                        this.pause();
                        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
                        if (this._ts) {
                            this._start = prevStart;
                            _setEnd(this);
                            return this.render(totalTime, suppressEvents, force);
                        }
                    }
                    this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
                    if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
                        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
                        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                            _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
                        }
                    }
                }
                return this;
            };
            _proto2.add = function add(child, position) {
                var _this2 = this;
                _isNumber(position) || (position = _parsePosition(this, position, child));
                if (!(child instanceof Animation)) {
                    if (_isArray(child)) {
                        child.forEach((function(obj) {
                            return _this2.add(obj, position);
                        }));
                        return this;
                    }
                    if (_isString(child)) return this.addLabel(child, position);
                    if (_isFunction(child)) child = Tween.delayedCall(0, child); else return this;
                }
                return this !== child ? _addToTimeline(this, child, position) : this;
            };
            _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
                if (void 0 === nested) nested = true;
                if (void 0 === tweens) tweens = true;
                if (void 0 === timelines) timelines = true;
                if (void 0 === ignoreBeforeTime) ignoreBeforeTime = -_bigNum;
                var a = [], child = this._first;
                while (child) {
                    if (child._start >= ignoreBeforeTime) if (child instanceof Tween) tweens && a.push(child); else {
                        timelines && a.push(child);
                        nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
                    }
                    child = child._next;
                }
                return a;
            };
            _proto2.getById = function getById(id) {
                var animations = this.getChildren(1, 1, 1), i = animations.length;
                while (i--) if (animations[i].vars.id === id) return animations[i];
            };
            _proto2.remove = function remove(child) {
                if (_isString(child)) return this.removeLabel(child);
                if (_isFunction(child)) return this.killTweensOf(child);
                _removeLinkedListItem(this, child);
                if (child === this._recent) this._recent = this._last;
                return _uncache(this);
            };
            _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
                if (!arguments.length) return this._tTime;
                this._forcing = 1;
                if (!this._dp && this._ts) this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
                _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
                this._forcing = 0;
                return this;
            };
            _proto2.addLabel = function addLabel(label, position) {
                this.labels[label] = _parsePosition(this, position);
                return this;
            };
            _proto2.removeLabel = function removeLabel(label) {
                delete this.labels[label];
                return this;
            };
            _proto2.addPause = function addPause(position, callback, params) {
                var t = Tween.delayedCall(0, callback || _emptyFunc, params);
                t.data = "isPause";
                this._hasPause = 1;
                return _addToTimeline(this, t, _parsePosition(this, position));
            };
            _proto2.removePause = function removePause(position) {
                var child = this._first;
                position = _parsePosition(this, position);
                while (child) {
                    if (child._start === position && "isPause" === child.data) _removeFromParent(child);
                    child = child._next;
                }
            };
            _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
                var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
                while (i--) _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
                return this;
            };
            _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
                var children, a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive);
                while (child) {
                    if (child instanceof Tween) {
                        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) a.push(child);
                    } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) a.push.apply(a, children);
                    child = child._next;
                }
                return a;
            };
            _proto2.tweenTo = function tweenTo(position, vars) {
                vars = vars || {};
                var initted, tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, tween = Tween.to(tl, _setDefaults({
                    ease: vars.ease || "none",
                    lazy: false,
                    immediateRender: false,
                    time: endTime,
                    overwrite: "auto",
                    duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
                    onStart: function onStart() {
                        tl.pause();
                        if (!initted) {
                            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
                            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
                            initted = 1;
                        }
                        _onStart && _onStart.apply(tween, onStartParams || []);
                    }
                }, vars));
                return immediateRender ? tween.render(0) : tween;
            };
            _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
                return this.tweenTo(toPosition, _setDefaults({
                    startAt: {
                        time: _parsePosition(this, fromPosition)
                    }
                }, vars));
            };
            _proto2.recent = function recent() {
                return this._recent;
            };
            _proto2.nextLabel = function nextLabel(afterTime) {
                if (void 0 === afterTime) afterTime = this._time;
                return _getLabelInDirection(this, _parsePosition(this, afterTime));
            };
            _proto2.previousLabel = function previousLabel(beforeTime) {
                if (void 0 === beforeTime) beforeTime = this._time;
                return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
            };
            _proto2.currentLabel = function currentLabel(value) {
                return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
            };
            _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
                if (void 0 === ignoreBeforeTime) ignoreBeforeTime = 0;
                var p, child = this._first, labels = this.labels;
                while (child) {
                    if (child._start >= ignoreBeforeTime) {
                        child._start += amount;
                        child._end += amount;
                    }
                    child = child._next;
                }
                if (adjustLabels) for (p in labels) if (labels[p] >= ignoreBeforeTime) labels[p] += amount;
                return _uncache(this);
            };
            _proto2.invalidate = function invalidate(soft) {
                var child = this._first;
                this._lock = 0;
                while (child) {
                    child.invalidate(soft);
                    child = child._next;
                }
                return _Animation.prototype.invalidate.call(this, soft);
            };
            _proto2.clear = function clear(includeLabels) {
                if (void 0 === includeLabels) includeLabels = true;
                var next, child = this._first;
                while (child) {
                    next = child._next;
                    this.remove(child);
                    child = next;
                }
                this._dp && (this._time = this._tTime = this._pTime = 0);
                includeLabels && (this.labels = {});
                return _uncache(this);
            };
            _proto2.totalDuration = function totalDuration(value) {
                var prev, start, parent, max = 0, self = this, child = self._last, prevStart = _bigNum;
                if (arguments.length) return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
                if (self._dirty) {
                    parent = self.parent;
                    while (child) {
                        prev = child._prev;
                        child._dirty && child.totalDuration();
                        start = child._start;
                        if (start > prevStart && self._sort && child._ts && !self._lock) {
                            self._lock = 1;
                            _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
                        } else prevStart = start;
                        if (start < 0 && child._ts) {
                            max -= start;
                            if (!parent && !self._dp || parent && parent.smoothChildTiming) {
                                self._start += start / self._ts;
                                self._time -= start;
                                self._tTime -= start;
                            }
                            self.shiftChildren(-start, false, -Infinity);
                            prevStart = 0;
                        }
                        child._end > max && child._ts && (max = child._end);
                        child = prev;
                    }
                    _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
                    self._dirty = 0;
                }
                return self._tDur;
            };
            Timeline.updateRoot = function updateRoot(time) {
                if (_globalTimeline._ts) {
                    _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
                    _lastRenderedFrame = _ticker.frame;
                }
                if (_ticker.frame >= _nextGCFrame) {
                    _nextGCFrame += _config.autoSleep || 120;
                    var child = _globalTimeline._first;
                    if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
                        while (child && !child._ts) child = child._next;
                        child || _ticker.sleep();
                    }
                }
            };
            return Timeline;
        }(Animation);
        _setDefaults(Timeline.prototype, {
            _lock: 0,
            _hasPause: 0,
            _forcing: 0
        });
        var _overwritingTween, _forceAllPropTweens, _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
            var result, startNums, color, endNum, chunk, startNum, hasRandom, a, pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0;
            pt.b = start;
            pt.e = end;
            start += "";
            end += "";
            if (hasRandom = ~end.indexOf("random(")) end = _replaceRandom(end);
            if (stringFilter) {
                a = [ start, end ];
                stringFilter(a, target, prop);
                start = a[0];
                end = a[1];
            }
            startNums = start.match(_complexStringNumExp) || [];
            while (result = _complexStringNumExp.exec(end)) {
                endNum = result[0];
                chunk = end.substring(index, result.index);
                if (color) color = (color + 1) % 5; else if ("rgba(" === chunk.substr(-5)) color = 1;
                if (endNum !== startNums[matchIndex++]) {
                    startNum = parseFloat(startNums[matchIndex - 1]) || 0;
                    pt._pt = {
                        _next: pt._pt,
                        p: chunk || 1 === matchIndex ? chunk : ",",
                        s: startNum,
                        c: "=" === endNum.charAt(1) ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
                        m: color && color < 4 ? Math.round : 0
                    };
                    index = _complexStringNumExp.lastIndex;
                }
            }
            pt.c = index < end.length ? end.substring(index, end.length) : "";
            pt.fp = funcParam;
            if (_relExp.test(end) || hasRandom) pt.e = 0;
            this._pt = pt;
            return pt;
        }, _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
            _isFunction(end) && (end = end(index || 0, target, targets));
            var pt, currentValue = target[prop], parsedStart = "get" !== start ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc;
            if (_isString(end)) {
                if (~end.indexOf("random(")) end = _replaceRandom(end);
                if ("=" === end.charAt(1)) {
                    pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
                    if (pt || 0 === pt) end = pt;
                }
            }
            if (!optional || parsedStart !== end || _forceAllPropTweens) {
                if (!isNaN(parsedStart * end) && "" !== end) {
                    pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), "boolean" === typeof currentValue ? _renderBoolean : _renderPlain, 0, setter);
                    funcParam && (pt.fp = funcParam);
                    modifier && pt.modifier(modifier, this, target);
                    return this._pt = pt;
                }
                !currentValue && !(prop in target) && _missingPlugin(prop, end);
                return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
            }
        }, _processVars = function _processVars(vars, index, target, targets, tween) {
            _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
            if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
            var p, copy = {};
            for (p in vars) copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
            return copy;
        }, _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
            var plugin, pt, ptLookup, i;
            if (_plugins[property] && false !== (plugin = new _plugins[property]).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets)) {
                tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
                if (tween !== _quickTween) {
                    ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
                    i = plugin._props.length;
                    while (i--) ptLookup[plugin._props[i]] = pt;
                }
            }
            return plugin;
        }, _initTween = function _initTween(tween, time, tTime) {
            var cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten, vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, onUpdateParams = vars.onUpdateParams, callbackScope = vars.callbackScope, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && "nested" === parent.data ? parent.vars.targets : targets, autoOverwrite = "auto" === tween._overwrite && !_suppressOverwrites, tl = tween.timeline;
            tl && (!keyframes || !ease) && (ease = "none");
            tween._ease = _parseEase(ease, _defaults.ease);
            tween._yEase = yoyoEase ? _invertEase(_parseEase(true === yoyoEase ? ease : yoyoEase, _defaults.ease)) : 0;
            if (yoyoEase && tween._yoyo && !tween._repeat) {
                yoyoEase = tween._yEase;
                tween._yEase = tween._ease;
                tween._ease = yoyoEase;
            }
            tween._from = !tl && !!vars.runBackwards;
            if (!tl || keyframes && !vars.stagger) {
                harness = targets[0] ? _getCache(targets[0]).harness : 0;
                harnessVars = harness && vars[harness.prop];
                cleanVars = _copyExcluding(vars, _reservedProps);
                if (prevStartAt) {
                    prevStartAt._zTime < 0 && prevStartAt.progress(1);
                    time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
                    prevStartAt._lazy = 0;
                }
                if (startAt) {
                    _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
                        data: "isStart",
                        overwrite: false,
                        parent,
                        immediateRender: true,
                        lazy: !prevStartAt && _isNotFalse(lazy),
                        startAt: null,
                        delay: 0,
                        onUpdate,
                        onUpdateParams,
                        callbackScope,
                        stagger: 0
                    }, startAt)));
                    tween._startAt._dp = 0;
                    tween._startAt._sat = tween;
                    time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
                    if (immediateRender) if (dur && time <= 0 && tTime <= 0) {
                        time && (tween._zTime = time);
                        return;
                    }
                } else if (runBackwards && dur) if (!prevStartAt) {
                    time && (immediateRender = false);
                    p = _setDefaults({
                        overwrite: false,
                        data: "isFromStart",
                        lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
                        immediateRender,
                        stagger: 0,
                        parent
                    }, cleanVars);
                    harnessVars && (p[harness.prop] = harnessVars);
                    _removeFromParent(tween._startAt = Tween.set(targets, p));
                    tween._startAt._dp = 0;
                    tween._startAt._sat = tween;
                    time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
                    tween._zTime = time;
                    if (!immediateRender) _initTween(tween._startAt, _tinyNum, _tinyNum); else if (!time) return;
                }
                tween._pt = tween._ptCache = 0;
                lazy = dur && _isNotFalse(lazy) || lazy && !dur;
                for (i = 0; i < targets.length; i++) {
                    target = targets[i];
                    gsData = target._gsap || _harness(targets)[i]._gsap;
                    tween._ptLookup[i] = ptLookup = {};
                    _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
                    index = fullTargets === targets ? i : fullTargets.indexOf(target);
                    if (harness && false !== (plugin = new harness).init(target, harnessVars || cleanVars, tween, index, fullTargets)) {
                        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
                        plugin._props.forEach((function(name) {
                            ptLookup[name] = pt;
                        }));
                        plugin.priority && (hasPriority = 1);
                    }
                    if (!harness || harnessVars) for (p in cleanVars) if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) plugin.priority && (hasPriority = 1); else ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
                    tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
                    if (autoOverwrite && tween._pt) {
                        _overwritingTween = tween;
                        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
                        overwritten = !tween.parent;
                        _overwritingTween = 0;
                    }
                    tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
                }
                hasPriority && _sortPropTweensByPriority(tween);
                tween._onInit && tween._onInit(tween);
            }
            tween._onUpdate = onUpdate;
            tween._initted = (!tween._op || tween._pt) && !overwritten;
            keyframes && time <= 0 && tl.render(_bigNum, true, true);
        }, _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
            var pt, rootPT, lookup, i, ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property];
            if (!ptCache) {
                ptCache = tween._ptCache[property] = [];
                lookup = tween._ptLookup;
                i = tween._targets.length;
                while (i--) {
                    pt = lookup[i][property];
                    if (pt && pt.d && pt.d._pt) {
                        pt = pt.d._pt;
                        while (pt && pt.p !== property && pt.fp !== property) pt = pt._next;
                    }
                    if (!pt) {
                        _forceAllPropTweens = 1;
                        tween.vars[property] = "+=0";
                        _initTween(tween, time);
                        _forceAllPropTweens = 0;
                        return 1;
                    }
                    ptCache.push(pt);
                }
            }
            i = ptCache.length;
            while (i--) {
                rootPT = ptCache[i];
                pt = rootPT._pt || rootPT;
                pt.s = (start || 0 === start) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
                pt.c = value - pt.s;
                rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
                rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
            }
        }, _addAliasesToVars = function _addAliasesToVars(targets, vars) {
            var copy, p, i, aliases, harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases;
            if (!propertyAliases) return vars;
            copy = _merge({}, vars);
            for (p in propertyAliases) if (p in copy) {
                aliases = propertyAliases[p].split(",");
                i = aliases.length;
                while (i--) copy[aliases[i]] = copy[p];
            }
            return copy;
        }, _parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
            var p, a, ease = obj.ease || easeEach || "power1.inOut";
            if (_isArray(obj)) {
                a = allProps[prop] || (allProps[prop] = []);
                obj.forEach((function(value, i) {
                    return a.push({
                        t: i / (obj.length - 1) * 100,
                        v: value,
                        e: ease
                    });
                }));
            } else for (p in obj) {
                a = allProps[p] || (allProps[p] = []);
                "ease" === p || a.push({
                    t: parseFloat(prop),
                    v: obj[p],
                    e: ease
                });
            }
        }, _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
            return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
        }, _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", _staggerPropsToSkip = {};
        _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", (function(name) {
            return _staggerPropsToSkip[name] = 1;
        }));
        var Tween = function(_Animation2) {
            _inheritsLoose(Tween, _Animation2);
            function Tween(targets, vars, position, skipInherit) {
                var _this3;
                if ("number" === typeof vars) {
                    position.duration = vars;
                    vars = position;
                    position = null;
                }
                _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
                var tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge, _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [ targets ] : toArray(targets);
                _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
                _this3._ptLookup = [];
                _this3._overwrite = overwrite;
                if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
                    vars = _this3.vars;
                    tl = _this3.timeline = new Timeline({
                        data: "nested",
                        defaults: defaults || {},
                        targets: parent && "nested" === parent.data ? parent.vars.targets : parsedTargets
                    });
                    tl.kill();
                    tl.parent = tl._dp = _assertThisInitialized(_this3);
                    tl._start = 0;
                    if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
                        l = parsedTargets.length;
                        staggerFunc = stagger && distribute(stagger);
                        if (_isObject(stagger)) for (p in stagger) if (~_staggerTweenProps.indexOf(p)) {
                            staggerVarsToMerge || (staggerVarsToMerge = {});
                            staggerVarsToMerge[p] = stagger[p];
                        }
                        for (i = 0; i < l; i++) {
                            copy = _copyExcluding(vars, _staggerPropsToSkip);
                            copy.stagger = 0;
                            yoyoEase && (copy.yoyoEase = yoyoEase);
                            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
                            curTarget = parsedTargets[i];
                            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
                            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
                            if (!stagger && 1 === l && copy.delay) {
                                _this3._delay = delay = copy.delay;
                                _this3._start += delay;
                                copy.delay = 0;
                            }
                            tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
                            tl._ease = _easeMap.none;
                        }
                        tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
                    } else if (keyframes) {
                        _inheritDefaults(_setDefaults(tl.vars.defaults, {
                            ease: "none"
                        }));
                        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
                        var a, kf, v, time = 0;
                        if (_isArray(keyframes)) {
                            keyframes.forEach((function(frame) {
                                return tl.to(parsedTargets, frame, ">");
                            }));
                            tl.duration();
                        } else {
                            copy = {};
                            for (p in keyframes) "ease" === p || "easeEach" === p || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
                            for (p in copy) {
                                a = copy[p].sort((function(a, b) {
                                    return a.t - b.t;
                                }));
                                time = 0;
                                for (i = 0; i < a.length; i++) {
                                    kf = a[i];
                                    v = {
                                        ease: kf.e,
                                        duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                                    };
                                    v[p] = kf.v;
                                    tl.to(parsedTargets, v, time);
                                    time += v.duration;
                                }
                            }
                            tl.duration() < duration && tl.to({}, {
                                duration: duration - tl.duration()
                            });
                        }
                    }
                    duration || _this3.duration(duration = tl.duration());
                } else _this3.timeline = 0;
                if (true === overwrite && !_suppressOverwrites) {
                    _overwritingTween = _assertThisInitialized(_this3);
                    _globalTimeline.killTweensOf(parsedTargets);
                    _overwritingTween = 0;
                }
                _addToTimeline(parent, _assertThisInitialized(_this3), position);
                vars.reversed && _this3.reverse();
                vars.paused && _this3.paused(true);
                if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && "nested" !== parent.data) {
                    _this3._tTime = -_tinyNum;
                    _this3.render(Math.max(0, -delay) || 0);
                }
                scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
                return _this3;
            }
            var _proto3 = Tween.prototype;
            _proto3.render = function render(totalTime, suppressEvents, force) {
                var time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline, yoyoEase, prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime;
                if (!dur) _renderZeroDurationTween(this, totalTime, suppressEvents, force); else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
                    time = tTime;
                    timeline = this.timeline;
                    if (this._repeat) {
                        cycleDuration = dur + this._rDelay;
                        if (this._repeat < -1 && isNegative) return this.totalTime(100 * cycleDuration + totalTime, suppressEvents, force);
                        time = _roundPrecise(tTime % cycleDuration);
                        if (tTime === tDur) {
                            iteration = this._repeat;
                            time = dur;
                        } else {
                            iteration = ~~(tTime / cycleDuration);
                            if (iteration && iteration === tTime / cycleDuration) {
                                time = dur;
                                iteration--;
                            }
                            time > dur && (time = dur);
                        }
                        isYoyo = this._yoyo && 1 & iteration;
                        if (isYoyo) {
                            yoyoEase = this._yEase;
                            time = dur - time;
                        }
                        prevIteration = _animationCycle(this._tTime, cycleDuration);
                        if (time === prevTime && !force && this._initted) {
                            this._tTime = tTime;
                            return this;
                        }
                        if (iteration !== prevIteration) {
                            timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo);
                            if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
                                this._lock = force = 1;
                                this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
                            }
                        }
                    }
                    if (!this._initted) {
                        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
                            this._tTime = 0;
                            return this;
                        }
                        if (prevTime !== this._time) return this;
                        if (dur !== this._dur) return this.render(totalTime, suppressEvents, force);
                    }
                    this._tTime = tTime;
                    this._time = time;
                    if (!this._act && this._ts) {
                        this._act = 1;
                        this._lazy = 0;
                    }
                    this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
                    if (this._from) this.ratio = ratio = 1 - ratio;
                    if (time && !prevTime && !suppressEvents) {
                        _callback(this, "onStart");
                        if (this._tTime !== tTime) return this;
                    }
                    pt = this._pt;
                    while (pt) {
                        pt.r(ratio, pt.d);
                        pt = pt._next;
                    }
                    timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
                    if (this._onUpdate && !suppressEvents) {
                        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
                        _callback(this, "onUpdate");
                    }
                    this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
                    if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
                        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
                        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
                        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
                            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
                            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
                        }
                    }
                }
                return this;
            };
            _proto3.targets = function targets() {
                return this._targets;
            };
            _proto3.invalidate = function invalidate(soft) {
                (!soft || !this.vars.runBackwards) && (this._startAt = 0);
                this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
                this._ptLookup = [];
                this.timeline && this.timeline.invalidate(soft);
                return _Animation2.prototype.invalidate.call(this, soft);
            };
            _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
                _tickerActive || _ticker.wake();
                this._ts || this.play();
                var ratio, time = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
                this._initted || _initTween(this, time);
                ratio = this._ease(time / this._dur);
                if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) return this.resetTo(property, value, start, startIsRelative);
                _alignPlayhead(this, 0);
                this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
                return this.render(0);
            };
            _proto3.kill = function kill(targets, vars) {
                if (void 0 === vars) vars = "all";
                if (!targets && (!vars || "all" === vars)) {
                    this._lazy = this._pt = 0;
                    return this.parent ? _interrupt(this) : this;
                }
                if (this.timeline) {
                    var tDur = this.timeline.totalDuration();
                    this.timeline.killTweensOf(targets, vars, _overwritingTween && true !== _overwritingTween.vars.overwrite)._first || _interrupt(this);
                    this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
                    return this;
                }
                var overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i, parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt;
                if ((!vars || "all" === vars) && _arraysMatch(parsedTargets, killingTargets)) {
                    "all" === vars && (this._pt = 0);
                    return _interrupt(this);
                }
                overwrittenProps = this._op = this._op || [];
                if ("all" !== vars) {
                    if (_isString(vars)) {
                        p = {};
                        _forEachName(vars, (function(name) {
                            return p[name] = 1;
                        }));
                        vars = p;
                    }
                    vars = _addAliasesToVars(parsedTargets, vars);
                }
                i = parsedTargets.length;
                while (i--) if (~killingTargets.indexOf(parsedTargets[i])) {
                    curLookup = propTweenLookup[i];
                    if ("all" === vars) {
                        overwrittenProps[i] = vars;
                        props = curLookup;
                        curOverwriteProps = {};
                    } else {
                        curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
                        props = vars;
                    }
                    for (p in props) {
                        pt = curLookup && curLookup[p];
                        if (pt) {
                            if (!("kill" in pt.d) || true === pt.d.kill(p)) _removeLinkedListItem(this, pt, "_pt");
                            delete curLookup[p];
                        }
                        if ("all" !== curOverwriteProps) curOverwriteProps[p] = 1;
                    }
                }
                this._initted && !this._pt && firstPT && _interrupt(this);
                return this;
            };
            Tween.to = function to(targets, vars) {
                return new Tween(targets, vars, arguments[2]);
            };
            Tween.from = function from(targets, vars) {
                return _createTweenType(1, arguments);
            };
            Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
                return new Tween(callback, 0, {
                    immediateRender: false,
                    lazy: false,
                    overwrite: false,
                    delay,
                    onComplete: callback,
                    onReverseComplete: callback,
                    onCompleteParams: params,
                    onReverseCompleteParams: params,
                    callbackScope: scope
                });
            };
            Tween.fromTo = function fromTo(targets, fromVars, toVars) {
                return _createTweenType(2, arguments);
            };
            Tween.set = function set(targets, vars) {
                vars.duration = 0;
                vars.repeatDelay || (vars.repeat = 0);
                return new Tween(targets, vars);
            };
            Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
                return _globalTimeline.killTweensOf(targets, props, onlyActive);
            };
            return Tween;
        }(Animation);
        _setDefaults(Tween.prototype, {
            _targets: [],
            _lazy: 0,
            _startAt: 0,
            _op: 0,
            _onInit: 0
        });
        _forEachName("staggerTo,staggerFrom,staggerFromTo", (function(name) {
            Tween[name] = function() {
                var tl = new Timeline, params = _slice.call(arguments, 0);
                params.splice("staggerFromTo" === name ? 5 : 4, 0, 0);
                return tl[name].apply(tl, params);
            };
        }));
        var _setterPlain = function _setterPlain(target, property, value) {
            return target[property] = value;
        }, _setterFunc = function _setterFunc(target, property, value) {
            return target[property](value);
        }, _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
            return target[property](data.fp, value);
        }, _setterAttribute = function _setterAttribute(target, property, value) {
            return target.setAttribute(property, value);
        }, _getSetter = function _getSetter(target, property) {
            return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
        }, _renderPlain = function _renderPlain(ratio, data) {
            return data.set(data.t, data.p, Math.round(1e6 * (data.s + data.c * ratio)) / 1e6, data);
        }, _renderBoolean = function _renderBoolean(ratio, data) {
            return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
        }, _renderComplexString = function _renderComplexString(ratio, data) {
            var pt = data._pt, s = "";
            if (!ratio && data.b) s = data.b; else if (1 === ratio && data.e) s = data.e; else {
                while (pt) {
                    s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round(1e4 * (pt.s + pt.c * ratio)) / 1e4) + s;
                    pt = pt._next;
                }
                s += data.c;
            }
            data.set(data.t, data.p, s, data);
        }, _renderPropTweens = function _renderPropTweens(ratio, data) {
            var pt = data._pt;
            while (pt) {
                pt.r(ratio, pt.d);
                pt = pt._next;
            }
        }, _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
            var next, pt = this._pt;
            while (pt) {
                next = pt._next;
                pt.p === property && pt.modifier(modifier, tween, target);
                pt = next;
            }
        }, _killPropTweensOf = function _killPropTweensOf(property) {
            var hasNonDependentRemaining, next, pt = this._pt;
            while (pt) {
                next = pt._next;
                if (pt.p === property && !pt.op || pt.op === property) _removeLinkedListItem(this, pt, "_pt"); else if (!pt.dep) hasNonDependentRemaining = 1;
                pt = next;
            }
            return !hasNonDependentRemaining;
        }, _setterWithModifier = function _setterWithModifier(target, property, value, data) {
            data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
        }, _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
            var next, pt2, first, last, pt = parent._pt;
            while (pt) {
                next = pt._next;
                pt2 = first;
                while (pt2 && pt2.pr > pt.pr) pt2 = pt2._next;
                if (pt._prev = pt2 ? pt2._prev : last) pt._prev._next = pt; else first = pt;
                if (pt._next = pt2) pt2._prev = pt; else last = pt;
                pt = next;
            }
            parent._pt = first;
        };
        var PropTween = function() {
            function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
                this.t = target;
                this.s = start;
                this.c = change;
                this.p = prop;
                this.r = renderer || _renderPlain;
                this.d = data || this;
                this.set = setter || _setterPlain;
                this.pr = priority || 0;
                this._next = next;
                if (next) next._prev = this;
            }
            var _proto4 = PropTween.prototype;
            _proto4.modifier = function modifier(func, tween, target) {
                this.mSet = this.mSet || this.set;
                this.set = _setterWithModifier;
                this.m = func;
                this.mt = target;
                this.tween = tween;
            };
            return PropTween;
        }();
        _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(name) {
            return _reservedProps[name] = 1;
        }));
        _globals.TweenMax = _globals.TweenLite = Tween;
        _globals.TimelineLite = _globals.TimelineMax = Timeline;
        _globalTimeline = new Timeline({
            sortChildren: false,
            defaults: _defaults,
            autoRemoveChildren: true,
            id: "root",
            smoothChildTiming: true
        });
        _config.stringFilter = _colorStringFilter;
        var _media = [], _listeners = {}, _emptyArray = [], _lastMediaTime = 0, _dispatch = function _dispatch(type) {
            return (_listeners[type] || _emptyArray).map((function(f) {
                return f();
            }));
        }, _onMediaChange = function _onMediaChange() {
            var time = Date.now(), matches = [];
            if (time - _lastMediaTime > 2) {
                _dispatch("matchMediaInit");
                _media.forEach((function(c) {
                    var match, p, anyMatch, toggled, queries = c.queries, conditions = c.conditions;
                    for (p in queries) {
                        match = _win.matchMedia(queries[p]).matches;
                        match && (anyMatch = 1);
                        if (match !== conditions[p]) {
                            conditions[p] = match;
                            toggled = 1;
                        }
                    }
                    if (toggled) {
                        c.revert();
                        anyMatch && matches.push(c);
                    }
                }));
                _dispatch("matchMediaRevert");
                matches.forEach((function(c) {
                    return c.onMatch(c);
                }));
                _lastMediaTime = time;
                _dispatch("matchMedia");
            }
        };
        var Context = function() {
            function Context(func, scope) {
                this.selector = scope && selector(scope);
                this.data = [];
                this._r = [];
                this.isReverted = false;
                func && this.add(func);
            }
            var _proto5 = Context.prototype;
            _proto5.add = function add(name, func, scope) {
                if (_isFunction(name)) {
                    scope = func;
                    func = name;
                    name = _isFunction;
                }
                var self = this, f = function f() {
                    var result, prev = _context, prevSelector = self.selector;
                    prev && prev !== self && prev.data.push(self);
                    scope && (self.selector = selector(scope));
                    _context = self;
                    result = func.apply(self, arguments);
                    _isFunction(result) && self._r.push(result);
                    _context = prev;
                    self.selector = prevSelector;
                    self.isReverted = false;
                    return result;
                };
                self.last = f;
                return name === _isFunction ? f(self) : name ? self[name] = f : f;
            };
            _proto5.ignore = function ignore(func) {
                var prev = _context;
                _context = null;
                func(this);
                _context = prev;
            };
            _proto5.getTweens = function getTweens() {
                var a = [];
                this.data.forEach((function(e) {
                    return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && "nested" === e.parent.data) && a.push(e);
                }));
                return a;
            };
            _proto5.clear = function clear() {
                this._r.length = this.data.length = 0;
            };
            _proto5.kill = function kill(revert, matchMedia) {
                var _this4 = this;
                if (revert) {
                    var tweens = this.getTweens();
                    this.data.forEach((function(t) {
                        if ("isFlip" === t.data) {
                            t.revert();
                            t.getChildren(true, true, false).forEach((function(tween) {
                                return tweens.splice(tweens.indexOf(tween), 1);
                            }));
                        }
                    }));
                    tweens.map((function(t) {
                        return {
                            g: t.globalTime(0),
                            t
                        };
                    })).sort((function(a, b) {
                        return b.g - a.g || -1;
                    })).forEach((function(o) {
                        return o.t.revert(revert);
                    }));
                    this.data.forEach((function(e) {
                        return !(e instanceof Animation) && e.revert && e.revert(revert);
                    }));
                    this._r.forEach((function(f) {
                        return f(revert, _this4);
                    }));
                    this.isReverted = true;
                } else this.data.forEach((function(e) {
                    return e.kill && e.kill();
                }));
                this.clear();
                if (matchMedia) {
                    var i = _media.indexOf(this);
                    !!~i && _media.splice(i, 1);
                }
            };
            _proto5.revert = function revert(config) {
                this.kill(config || {});
            };
            return Context;
        }();
        var MatchMedia = function() {
            function MatchMedia(scope) {
                this.contexts = [];
                this.scope = scope;
            }
            var _proto6 = MatchMedia.prototype;
            _proto6.add = function add(conditions, func, scope) {
                _isObject(conditions) || (conditions = {
                    matches: conditions
                });
                var mq, p, active, context = new Context(0, scope || this.scope), cond = context.conditions = {};
                this.contexts.push(context);
                func = context.add("onMatch", func);
                context.queries = conditions;
                for (p in conditions) if ("all" === p) active = 1; else {
                    mq = _win.matchMedia(conditions[p]);
                    if (mq) {
                        _media.indexOf(context) < 0 && _media.push(context);
                        (cond[p] = mq.matches) && (active = 1);
                        mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
                    }
                }
                active && func(context);
                return this;
            };
            _proto6.revert = function revert(config) {
                this.kill(config || {});
            };
            _proto6.kill = function kill(revert) {
                this.contexts.forEach((function(c) {
                    return c.kill(revert, true);
                }));
            };
            return MatchMedia;
        }();
        var _gsap = {
            registerPlugin: function registerPlugin() {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                args.forEach((function(config) {
                    return _createPlugin(config);
                }));
            },
            timeline: function timeline(vars) {
                return new Timeline(vars);
            },
            getTweensOf: function getTweensOf(targets, onlyActive) {
                return _globalTimeline.getTweensOf(targets, onlyActive);
            },
            getProperty: function getProperty(target, property, unit, uncache) {
                _isString(target) && (target = toArray(target)[0]);
                var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
                "native" === unit && (unit = "");
                return !target ? target : !property ? function(property, unit, uncache) {
                    return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
                } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
            },
            quickSetter: function quickSetter(target, property, unit) {
                target = toArray(target);
                if (target.length > 1) {
                    var setters = target.map((function(t) {
                        return gsap.quickSetter(t, property, unit);
                    })), l = setters.length;
                    return function(value) {
                        var i = l;
                        while (i--) setters[i](value);
                    };
                }
                target = target[0] || {};
                var Plugin = _plugins[property], cache = _getCache(target), p = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
                    var p = new Plugin;
                    _quickTween._pt = 0;
                    p.init(target, unit ? value + unit : value, _quickTween, 0, [ target ]);
                    p.render(1, p);
                    _quickTween._pt && _renderPropTweens(1, _quickTween);
                } : cache.set(target, p);
                return Plugin ? setter : function(value) {
                    return setter(target, p, unit ? value + unit : value, cache, 1);
                };
            },
            quickTo: function quickTo(target, property, vars) {
                var _merge2;
                var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, 
                _merge2), vars || {})), func = function func(value, start, startIsRelative) {
                    return tween.resetTo(property, value, start, startIsRelative);
                };
                func.tween = tween;
                return func;
            },
            isTweening: function isTweening(targets) {
                return _globalTimeline.getTweensOf(targets, true).length > 0;
            },
            defaults: function defaults(value) {
                value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
                return _mergeDeep(_defaults, value || {});
            },
            config: function config(value) {
                return _mergeDeep(_config, value || {});
            },
            registerEffect: function registerEffect(_ref3) {
                var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
                (plugins || "").split(",").forEach((function(pluginName) {
                    return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
                }));
                _effects[name] = function(targets, vars, tl) {
                    return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
                };
                if (extendTimeline) Timeline.prototype[name] = function(targets, vars, position) {
                    return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
                };
            },
            registerEase: function registerEase(name, ease) {
                _easeMap[name] = _parseEase(ease);
            },
            parseEase: function parseEase(ease, defaultEase) {
                return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
            },
            getById: function getById(id) {
                return _globalTimeline.getById(id);
            },
            exportRoot: function exportRoot(vars, includeDelayedCalls) {
                if (void 0 === vars) vars = {};
                var child, next, tl = new Timeline(vars);
                tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
                _globalTimeline.remove(tl);
                tl._dp = 0;
                tl._time = tl._tTime = _globalTimeline._time;
                child = _globalTimeline._first;
                while (child) {
                    next = child._next;
                    if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) _addToTimeline(tl, child, child._start - child._delay);
                    child = next;
                }
                _addToTimeline(_globalTimeline, tl, 0);
                return tl;
            },
            context: function context(func, scope) {
                return func ? new Context(func, scope) : _context;
            },
            matchMedia: function matchMedia(scope) {
                return new MatchMedia(scope);
            },
            matchMediaRefresh: function matchMediaRefresh() {
                return _media.forEach((function(c) {
                    var found, p, cond = c.conditions;
                    for (p in cond) if (cond[p]) {
                        cond[p] = false;
                        found = 1;
                    }
                    found && c.revert();
                })) || _onMediaChange();
            },
            addEventListener: function addEventListener(type, callback) {
                var a = _listeners[type] || (_listeners[type] = []);
                ~a.indexOf(callback) || a.push(callback);
            },
            removeEventListener: function removeEventListener(type, callback) {
                var a = _listeners[type], i = a && a.indexOf(callback);
                i >= 0 && a.splice(i, 1);
            },
            utils: {
                wrap,
                wrapYoyo,
                distribute,
                random,
                snap,
                normalize,
                getUnit,
                clamp,
                splitColor,
                toArray,
                selector,
                mapRange,
                pipe,
                unitize,
                interpolate,
                shuffle
            },
            install: _install,
            effects: _effects,
            ticker: _ticker,
            updateRoot: Timeline.updateRoot,
            plugins: _plugins,
            globalTimeline: _globalTimeline,
            core: {
                PropTween,
                globals: _addGlobal,
                Tween,
                Timeline,
                Animation,
                getCache: _getCache,
                _removeLinkedListItem,
                reverting: function reverting() {
                    return _reverting;
                },
                context: function context(toAdd) {
                    if (toAdd && _context) {
                        _context.data.push(toAdd);
                        toAdd._ctx = _context;
                    }
                    return _context;
                },
                suppressOverwrites: function suppressOverwrites(value) {
                    return _suppressOverwrites = value;
                }
            }
        };
        _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", (function(name) {
            return _gsap[name] = Tween[name];
        }));
        _ticker.add(Timeline.updateRoot);
        _quickTween = _gsap.to({}, {
            duration: 0
        });
        var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
            var pt = plugin._pt;
            while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) pt = pt._next;
            return pt;
        }, _addModifiers = function _addModifiers(tween, modifiers) {
            var p, i, pt, targets = tween._targets;
            for (p in modifiers) {
                i = targets.length;
                while (i--) {
                    pt = tween._ptLookup[i][p];
                    if (pt && (pt = pt.d)) {
                        if (pt._pt) pt = _getPluginPropTween(pt, p);
                        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
                    }
                }
            }
        }, _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
            return {
                name,
                rawVars: 1,
                init: function init(target, vars, tween) {
                    tween._onInit = function(tween) {
                        var temp, p;
                        if (_isString(vars)) {
                            temp = {};
                            _forEachName(vars, (function(name) {
                                return temp[name] = 1;
                            }));
                            vars = temp;
                        }
                        if (modifier) {
                            temp = {};
                            for (p in vars) temp[p] = modifier(vars[p]);
                            vars = temp;
                        }
                        _addModifiers(tween, vars);
                    };
                }
            };
        };
        var gsap = _gsap.registerPlugin({
            name: "attr",
            init: function init(target, vars, tween, index, targets) {
                var p, pt, v;
                this.tween = tween;
                for (p in vars) {
                    v = target.getAttribute(p) || "";
                    pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
                    pt.op = p;
                    pt.b = v;
                    this._props.push(p);
                }
            },
            render: function render(ratio, data) {
                var pt = data._pt;
                while (pt) {
                    _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
                    pt = pt._next;
                }
            }
        }, {
            name: "endArray",
            init: function init(target, value) {
                var i = value.length;
                while (i--) this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
            }
        }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
        Tween.version = Timeline.version = gsap.version = "3.11.4";
        _coreReady = 1;
        _windowExists() && _wake();
        _easeMap.Power0, _easeMap.Power1, _easeMap.Power2, _easeMap.Power3, _easeMap.Power4, 
        _easeMap.Linear, _easeMap.Quad, _easeMap.Cubic, _easeMap.Quart, _easeMap.Quint, 
        _easeMap.Strong, _easeMap.Elastic, _easeMap.Back, _easeMap.SteppedEase, _easeMap.Bounce, 
        _easeMap.Sine, _easeMap.Expo, _easeMap.Circ;
        /*!
 * CSSPlugin 3.11.4
 * https://greensock.com
 *
 * Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
        var CSSPlugin_win, CSSPlugin_doc, _docElement, _pluginInitted, _tempDiv, _recentSetterPlugin, CSSPlugin_reverting, _supports3D, CSSPlugin_windowExists = function _windowExists() {
            return "undefined" !== typeof window;
        }, _transformProps = {}, _RAD2DEG = 180 / Math.PI, _DEG2RAD = Math.PI / 180, _atan2 = Math.atan2, CSSPlugin_bigNum = 1e8, _capsExp = /([A-Z])/g, _horizontalExp = /(left|right|width|margin|padding|x)/i, _complexExp = /[\s,\(]\S/, _propertyAliases = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        }, _renderCSSProp = function _renderCSSProp(ratio, data) {
            return data.set(data.t, data.p, Math.round(1e4 * (data.s + data.c * ratio)) / 1e4 + data.u, data);
        }, _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
            return data.set(data.t, data.p, 1 === ratio ? data.e : Math.round(1e4 * (data.s + data.c * ratio)) / 1e4 + data.u, data);
        }, _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
            return data.set(data.t, data.p, ratio ? Math.round(1e4 * (data.s + data.c * ratio)) / 1e4 + data.u : data.b, data);
        }, _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
            var value = data.s + data.c * ratio;
            data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
        }, _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
            return data.set(data.t, data.p, ratio ? data.e : data.b, data);
        }, _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
            return data.set(data.t, data.p, 1 !== ratio ? data.b : data.e, data);
        }, _setterCSSStyle = function _setterCSSStyle(target, property, value) {
            return target.style[property] = value;
        }, _setterCSSProp = function _setterCSSProp(target, property, value) {
            return target.style.setProperty(property, value);
        }, _setterTransform = function _setterTransform(target, property, value) {
            return target._gsap[property] = value;
        }, _setterScale = function _setterScale(target, property, value) {
            return target._gsap.scaleX = target._gsap.scaleY = value;
        }, _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
            var cache = target._gsap;
            cache.scaleX = cache.scaleY = value;
            cache.renderTransform(ratio, cache);
        }, _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
            var cache = target._gsap;
            cache[property] = value;
            cache.renderTransform(ratio, cache);
        }, _transformProp = "transform", _transformOriginProp = _transformProp + "Origin", _saveStyle = function _saveStyle(property, isNotCSS) {
            var _this = this;
            var target = this.target, style = target.style;
            if (property in _transformProps) {
                this.tfm = this.tfm || {};
                if ("transform" !== property) {
                    property = _propertyAliases[property] || property;
                    ~property.indexOf(",") ? property.split(",").forEach((function(a) {
                        return _this.tfm[a] = _get(target, a);
                    })) : this.tfm[property] = target._gsap.x ? target._gsap[property] : _get(target, property);
                }
                if (this.props.indexOf(_transformProp) >= 0) return;
                if (target._gsap.svg) {
                    this.svgo = target.getAttribute("data-svg-origin");
                    this.props.push(_transformOriginProp, isNotCSS, "");
                }
                property = _transformProp;
            }
            (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
        }, _removeIndependentTransforms = function _removeIndependentTransforms(style) {
            if (style.translate) {
                style.removeProperty("translate");
                style.removeProperty("scale");
                style.removeProperty("rotate");
            }
        }, _revertStyle = function _revertStyle() {
            var i, p, props = this.props, target = this.target, style = target.style, cache = target._gsap;
            for (i = 0; i < props.length; i += 3) props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].replace(_capsExp, "-$1").toLowerCase());
            if (this.tfm) {
                for (p in this.tfm) cache[p] = this.tfm[p];
                if (cache.svg) {
                    cache.renderTransform();
                    target.setAttribute("data-svg-origin", this.svgo || "");
                }
                i = CSSPlugin_reverting();
                if (i && !i.isStart && !style[_transformProp]) {
                    _removeIndependentTransforms(style);
                    cache.uncache = 1;
                }
            }
        }, _getStyleSaver = function _getStyleSaver(target, properties) {
            var saver = {
                target,
                props: [],
                revert: _revertStyle,
                save: _saveStyle
            };
            properties && properties.split(",").forEach((function(p) {
                return saver.save(p);
            }));
            return saver;
        }, _createElement = function _createElement(type, ns) {
            var e = CSSPlugin_doc.createElementNS ? CSSPlugin_doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : CSSPlugin_doc.createElement(type);
            return e.style ? e : CSSPlugin_doc.createElement(type);
        }, _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
            var cs = getComputedStyle(target);
            return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || "";
        }, _prefixes = "O,Moz,ms,Ms,Webkit".split(","), _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
            var e = element || _tempDiv, s = e.style, i = 5;
            if (property in s && !preferPrefix) return property;
            property = property.charAt(0).toUpperCase() + property.substr(1);
            while (i-- && !(_prefixes[i] + property in s)) ;
            return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
        }, _initCore = function _initCore() {
            if (CSSPlugin_windowExists() && window.document) {
                CSSPlugin_win = window;
                CSSPlugin_doc = CSSPlugin_win.document;
                _docElement = CSSPlugin_doc.documentElement;
                _tempDiv = _createElement("div") || {
                    style: {}
                };
                _createElement("div");
                _transformProp = _checkPropPrefix(_transformProp);
                _transformOriginProp = _transformProp + "Origin";
                _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
                _supports3D = !!_checkPropPrefix("perspective");
                CSSPlugin_reverting = gsap.core.reverting;
                _pluginInitted = 1;
            }
        }, _getBBoxHack = function _getBBoxHack(swapIfPossible) {
            var bbox, svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText;
            _docElement.appendChild(svg);
            svg.appendChild(this);
            this.style.display = "block";
            if (swapIfPossible) try {
                bbox = this.getBBox();
                this._gsapBBox = this.getBBox;
                this.getBBox = _getBBoxHack;
            } catch (e) {} else if (this._gsapBBox) bbox = this._gsapBBox();
            if (oldParent) if (oldSibling) oldParent.insertBefore(this, oldSibling); else oldParent.appendChild(this);
            _docElement.removeChild(svg);
            this.style.cssText = oldCSS;
            return bbox;
        }, _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
            var i = attributesArray.length;
            while (i--) if (target.hasAttribute(attributesArray[i])) return target.getAttribute(attributesArray[i]);
        }, _getBBox = function _getBBox(target) {
            var bounds;
            try {
                bounds = target.getBBox();
            } catch (error) {
                bounds = _getBBoxHack.call(target, true);
            }
            bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true));
            return bounds && !bounds.width && !bounds.x && !bounds.y ? {
                x: +_getAttributeFallbacks(target, [ "x", "cx", "x1" ]) || 0,
                y: +_getAttributeFallbacks(target, [ "y", "cy", "y1" ]) || 0,
                width: 0,
                height: 0
            } : bounds;
        }, _isSVG = function _isSVG(e) {
            return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
        }, _removeProperty = function _removeProperty(target, property) {
            if (property) {
                var style = target.style;
                if (property in _transformProps && property !== _transformOriginProp) property = _transformProp;
                if (style.removeProperty) {
                    if ("ms" === property.substr(0, 2) || "webkit" === property.substr(0, 6)) property = "-" + property;
                    style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
                } else style.removeAttribute(property);
            }
        }, _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
            var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
            plugin._pt = pt;
            pt.b = beginning;
            pt.e = end;
            plugin._props.push(property);
            return pt;
        }, _nonConvertibleUnits = {
            deg: 1,
            rad: 1,
            turn: 1
        }, _nonStandardLayouts = {
            grid: 1,
            flex: 1
        }, _convertToUnit = function _convertToUnit(target, property, value, unit) {
            var px, parent, cache, isSVG, curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = "svg" === target.tagName.toLowerCase(), measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = "px" === unit, toPercent = "%" === unit;
            if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) return curValue;
            "px" !== curUnit && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
            isSVG = target.getCTM && _isSVG(target);
            if ((toPercent || "%" === curUnit) && (_transformProps[property] || ~property.indexOf("adius"))) {
                px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
                return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
            }
            style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
            parent = ~property.indexOf("adius") || "em" === unit && target.appendChild && !isRootSVG ? target : target.parentNode;
            if (isSVG) parent = (target.ownerSVGElement || {}).parentNode;
            if (!parent || parent === CSSPlugin_doc || !parent.appendChild) parent = CSSPlugin_doc.body;
            cache = parent._gsap;
            if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) return _round(curValue / cache.width * amount); else {
                (toPercent || "%" === curUnit) && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
                parent === target && (style.position = "static");
                parent.appendChild(_tempDiv);
                px = _tempDiv[measureProperty];
                parent.removeChild(_tempDiv);
                style.position = "absolute";
                if (horizontal && toPercent) {
                    cache = _getCache(parent);
                    cache.time = _ticker.time;
                    cache.width = parent[measureProperty];
                }
            }
            return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
        }, _get = function _get(target, property, unit, uncache) {
            var value;
            _pluginInitted || _initCore();
            if (property in _propertyAliases && "transform" !== property) {
                property = _propertyAliases[property];
                if (~property.indexOf(",")) property = property.split(",")[0];
            }
            if (_transformProps[property] && "transform" !== property) {
                value = _parseTransform(target, uncache);
                value = "transformOrigin" !== property ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
            } else {
                value = target.style[property];
                if (!value || "auto" === value || uncache || ~(value + "").indexOf("calc(")) value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || ("opacity" === property ? 1 : 0);
            }
            return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
        }, _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
            if (!start || "none" === start) {
                var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
                if (s && s !== start) {
                    prop = p;
                    start = s;
                } else if ("borderColor" === prop) start = _getComputedProperty(target, "borderTopColor");
            }
            var a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues, pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0;
            pt.b = start;
            pt.e = end;
            start += "";
            end += "";
            if ("auto" === end) {
                target.style[prop] = end;
                end = _getComputedProperty(target, prop) || end;
                target.style[prop] = start;
            }
            a = [ start, end ];
            _colorStringFilter(a);
            start = a[0];
            end = a[1];
            startValues = start.match(_numWithUnitExp) || [];
            endValues = end.match(_numWithUnitExp) || [];
            if (endValues.length) {
                while (result = _numWithUnitExp.exec(end)) {
                    endValue = result[0];
                    chunk = end.substring(index, result.index);
                    if (color) color = (color + 1) % 5; else if ("rgba(" === chunk.substr(-5) || "hsla(" === chunk.substr(-5)) color = 1;
                    if (endValue !== (startValue = startValues[matchIndex++] || "")) {
                        startNum = parseFloat(startValue) || 0;
                        startUnit = startValue.substr((startNum + "").length);
                        "=" === endValue.charAt(1) && (endValue = _parseRelative(startNum, endValue) + startUnit);
                        endNum = parseFloat(endValue);
                        endUnit = endValue.substr((endNum + "").length);
                        index = _numWithUnitExp.lastIndex - endUnit.length;
                        if (!endUnit) {
                            endUnit = endUnit || _config.units[prop] || startUnit;
                            if (index === end.length) {
                                end += endUnit;
                                pt.e += endUnit;
                            }
                        }
                        if (startUnit !== endUnit) startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
                        pt._pt = {
                            _next: pt._pt,
                            p: chunk || 1 === matchIndex ? chunk : ",",
                            s: startNum,
                            c: endNum - startNum,
                            m: color && color < 4 || "zIndex" === prop ? Math.round : 0
                        };
                    }
                }
                pt.c = index < end.length ? end.substring(index, end.length) : "";
            } else pt.r = "display" === prop && "none" === end ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
            _relExp.test(end) && (pt.e = 0);
            this._pt = pt;
            return pt;
        }, _keywordToPercent = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        }, _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
            var split = value.split(" "), x = split[0], y = split[1] || "50%";
            if ("top" === x || "bottom" === x || "left" === y || "right" === y) {
                value = x;
                x = y;
                y = value;
            }
            split[0] = _keywordToPercent[x] || x;
            split[1] = _keywordToPercent[y] || y;
            return split.join(" ");
        }, _renderClearProps = function _renderClearProps(ratio, data) {
            if (data.tween && data.tween._time === data.tween._dur) {
                var prop, clearTransforms, i, target = data.t, style = target.style, props = data.u, cache = target._gsap;
                if ("all" === props || true === props) {
                    style.cssText = "";
                    clearTransforms = 1;
                } else {
                    props = props.split(",");
                    i = props.length;
                    while (--i > -1) {
                        prop = props[i];
                        if (_transformProps[prop]) {
                            clearTransforms = 1;
                            prop = "transformOrigin" === prop ? _transformOriginProp : _transformProp;
                        }
                        _removeProperty(target, prop);
                    }
                }
                if (clearTransforms) {
                    _removeProperty(target, _transformProp);
                    if (cache) {
                        cache.svg && target.removeAttribute("transform");
                        _parseTransform(target, 1);
                        cache.uncache = 1;
                        _removeIndependentTransforms(style);
                    }
                }
            }
        }, _specialProps = {
            clearProps: function clearProps(plugin, target, property, endValue, tween) {
                if ("isFromStart" !== tween.data) {
                    var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
                    pt.u = endValue;
                    pt.pr = -10;
                    pt.tween = tween;
                    plugin._props.push(property);
                    return 1;
                }
            }
        }, _identity2DMatrix = [ 1, 0, 0, 1, 0, 0 ], _rotationalProperties = {}, _isNullTransform = function _isNullTransform(value) {
            return "matrix(1, 0, 0, 1, 0, 0)" === value || "none" === value || !value;
        }, _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
            var matrixString = _getComputedProperty(target, _transformProp);
            return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
        }, _getMatrix = function _getMatrix(target, force2D) {
            var parent, nextSibling, temp, addedToDOM, cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target);
            if (cache.svg && target.getAttribute("transform")) {
                temp = target.transform.baseVal.consolidate().matrix;
                matrix = [ temp.a, temp.b, temp.c, temp.d, temp.e, temp.f ];
                return "1,0,0,1,0,0" === matrix.join(",") ? _identity2DMatrix : matrix;
            } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
                temp = style.display;
                style.display = "block";
                parent = target.parentNode;
                if (!parent || !target.offsetParent) {
                    addedToDOM = 1;
                    nextSibling = target.nextElementSibling;
                    _docElement.appendChild(target);
                }
                matrix = _getComputedTransformMatrixAsArray(target);
                temp ? style.display = temp : _removeProperty(target, "display");
                if (addedToDOM) nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
            }
            return force2D && matrix.length > 6 ? [ matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13] ] : matrix;
        }, _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
            var bounds, determinant, x, y, cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0;
            if (!originIsAbsolute) {
                bounds = _getBBox(target);
                xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
                yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
            } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
                x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
                y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
                xOrigin = x;
                yOrigin = y;
            }
            if (smooth || false !== smooth && cache.smooth) {
                tx = xOrigin - xOriginOld;
                ty = yOrigin - yOriginOld;
                cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
                cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
            } else cache.xOffset = cache.yOffset = 0;
            cache.xOrigin = xOrigin;
            cache.yOrigin = yOrigin;
            cache.smooth = !!smooth;
            cache.origin = origin;
            cache.originIsAbsolute = !!originIsAbsolute;
            target.style[_transformOriginProp] = "0px 0px";
            if (pluginToAddPropTweensTo) {
                _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
                _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
                _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
                _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
            }
            target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
        }, _parseTransform = function _parseTransform(target, uncache) {
            var cache = target._gsap || new GSCache(target);
            if ("x" in cache && !uncache && !cache.uncache) return cache;
            var x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32, style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0";
            x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
            scaleX = scaleY = 1;
            cache.svg = !!(target.getCTM && _isSVG(target));
            if (cs.translate) {
                if ("none" !== cs.translate || "none" !== cs.scale || "none" !== cs.rotate) style[_transformProp] = ("none" !== cs.translate ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== cs.rotate ? "rotate(" + cs.rotate + ") " : "") + ("none" !== cs.scale ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + ("none" !== cs[_transformProp] ? cs[_transformProp] : "");
                style.scale = style.rotate = style.translate = "none";
            }
            matrix = _getMatrix(target, cache.svg);
            if (cache.svg) {
                if (cache.uncache) {
                    t2 = target.getBBox();
                    origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
                    t1 = "";
                } else t1 = !uncache && target.getAttribute("data-svg-origin");
                _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, false !== cache.smooth, matrix);
            }
            xOrigin = cache.xOrigin || 0;
            yOrigin = cache.yOrigin || 0;
            if (matrix !== _identity2DMatrix) {
                a = matrix[0];
                b = matrix[1];
                c = matrix[2];
                d = matrix[3];
                x = a12 = matrix[4];
                y = a22 = matrix[5];
                if (6 === matrix.length) {
                    scaleX = Math.sqrt(a * a + b * b);
                    scaleY = Math.sqrt(d * d + c * c);
                    rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
                    skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
                    skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
                    if (cache.svg) {
                        x -= xOrigin - (xOrigin * a + yOrigin * c);
                        y -= yOrigin - (xOrigin * b + yOrigin * d);
                    }
                } else {
                    a32 = matrix[6];
                    a42 = matrix[7];
                    a13 = matrix[8];
                    a23 = matrix[9];
                    a33 = matrix[10];
                    a43 = matrix[11];
                    x = matrix[12];
                    y = matrix[13];
                    z = matrix[14];
                    angle = _atan2(a32, a33);
                    rotationX = angle * _RAD2DEG;
                    if (angle) {
                        cos = Math.cos(-angle);
                        sin = Math.sin(-angle);
                        t1 = a12 * cos + a13 * sin;
                        t2 = a22 * cos + a23 * sin;
                        t3 = a32 * cos + a33 * sin;
                        a13 = a12 * -sin + a13 * cos;
                        a23 = a22 * -sin + a23 * cos;
                        a33 = a32 * -sin + a33 * cos;
                        a43 = a42 * -sin + a43 * cos;
                        a12 = t1;
                        a22 = t2;
                        a32 = t3;
                    }
                    angle = _atan2(-c, a33);
                    rotationY = angle * _RAD2DEG;
                    if (angle) {
                        cos = Math.cos(-angle);
                        sin = Math.sin(-angle);
                        t1 = a * cos - a13 * sin;
                        t2 = b * cos - a23 * sin;
                        t3 = c * cos - a33 * sin;
                        a43 = d * sin + a43 * cos;
                        a = t1;
                        b = t2;
                        c = t3;
                    }
                    angle = _atan2(b, a);
                    rotation = angle * _RAD2DEG;
                    if (angle) {
                        cos = Math.cos(angle);
                        sin = Math.sin(angle);
                        t1 = a * cos + b * sin;
                        t2 = a12 * cos + a22 * sin;
                        b = b * cos - a * sin;
                        a22 = a22 * cos - a12 * sin;
                        a = t1;
                        a12 = t2;
                    }
                    if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
                        rotationX = rotation = 0;
                        rotationY = 180 - rotationY;
                    }
                    scaleX = _round(Math.sqrt(a * a + b * b + c * c));
                    scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
                    angle = _atan2(a12, a22);
                    skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
                    perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
                }
                if (cache.svg) {
                    t1 = target.getAttribute("transform");
                    cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
                    t1 && target.setAttribute("transform", t1);
                }
            }
            if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) if (invertedScaleX) {
                scaleX *= -1;
                skewX += rotation <= 0 ? 180 : -180;
                rotation += rotation <= 0 ? 180 : -180;
            } else {
                scaleY *= -1;
                skewX += skewX <= 0 ? 180 : -180;
            }
            uncache = uncache || cache.uncache;
            cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
            cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
            cache.z = z + px;
            cache.scaleX = _round(scaleX);
            cache.scaleY = _round(scaleY);
            cache.rotation = _round(rotation) + deg;
            cache.rotationX = _round(rotationX) + deg;
            cache.rotationY = _round(rotationY) + deg;
            cache.skewX = skewX + deg;
            cache.skewY = skewY + deg;
            cache.transformPerspective = perspective + px;
            if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) style[_transformOriginProp] = _firstTwoOnly(origin);
            cache.xOffset = cache.yOffset = 0;
            cache.force3D = _config.force3D;
            cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
            cache.uncache = 0;
            return cache;
        }, _firstTwoOnly = function _firstTwoOnly(value) {
            return (value = value.split(" "))[0] + " " + value[1];
        }, _addPxTranslate = function _addPxTranslate(target, start, value) {
            var unit = getUnit(start);
            return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
        }, _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
            cache.z = "0px";
            cache.rotationY = cache.rotationX = "0deg";
            cache.force3D = 0;
            _renderCSSTransforms(ratio, cache);
        }, _zeroDeg = "0deg", _zeroPx = "0px", _endParenthesis = ") ", _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
            var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = "auto" === force3D && ratio && 1 !== ratio || true === force3D;
            if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
                var cos, angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle);
                angle = parseFloat(rotationX) * _DEG2RAD;
                cos = Math.cos(angle);
                x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
                y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
                z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
            }
            if (transformPerspective !== _zeroPx) transforms += "perspective(" + transformPerspective + _endParenthesis;
            if (xPercent || yPercent) transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
            if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
            if (rotation !== _zeroDeg) transforms += "rotate(" + rotation + _endParenthesis;
            if (rotationY !== _zeroDeg) transforms += "rotateY(" + rotationY + _endParenthesis;
            if (rotationX !== _zeroDeg) transforms += "rotateX(" + rotationX + _endParenthesis;
            if (skewX !== _zeroDeg || skewY !== _zeroDeg) transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
            if (1 !== scaleX || 1 !== scaleY) transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
            target.style[_transformProp] = transforms || "translate(0, 0)";
        }, _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
            var a11, a21, a12, a22, temp, _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y);
            rotation = parseFloat(rotation);
            skewX = parseFloat(skewX);
            skewY = parseFloat(skewY);
            if (skewY) {
                skewY = parseFloat(skewY);
                skewX += skewY;
                rotation += skewY;
            }
            if (rotation || skewX) {
                rotation *= _DEG2RAD;
                skewX *= _DEG2RAD;
                a11 = Math.cos(rotation) * scaleX;
                a21 = Math.sin(rotation) * scaleX;
                a12 = Math.sin(rotation - skewX) * -scaleY;
                a22 = Math.cos(rotation - skewX) * scaleY;
                if (skewX) {
                    skewY *= _DEG2RAD;
                    temp = Math.tan(skewX - skewY);
                    temp = Math.sqrt(1 + temp * temp);
                    a12 *= temp;
                    a22 *= temp;
                    if (skewY) {
                        temp = Math.tan(skewY);
                        temp = Math.sqrt(1 + temp * temp);
                        a11 *= temp;
                        a21 *= temp;
                    }
                }
                a11 = _round(a11);
                a21 = _round(a21);
                a12 = _round(a12);
                a22 = _round(a22);
            } else {
                a11 = scaleX;
                a22 = scaleY;
                a21 = a12 = 0;
            }
            if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
                tx = _convertToUnit(target, "x", x, "px");
                ty = _convertToUnit(target, "y", y, "px");
            }
            if (xOrigin || yOrigin || xOffset || yOffset) {
                tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
                ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
            }
            if (xPercent || yPercent) {
                temp = target.getBBox();
                tx = _round(tx + xPercent / 100 * temp.width);
                ty = _round(ty + yPercent / 100 * temp.height);
            }
            temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
            target.setAttribute("transform", temp);
            forceCSS && (target.style[_transformProp] = temp);
        }, _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
            var direction, pt, cap = 360, isString = _isString(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg";
            if (isString) {
                direction = endValue.split("_")[1];
                if ("short" === direction) {
                    change %= cap;
                    if (change !== change % (cap / 2)) change += change < 0 ? cap : -cap;
                }
                if ("cw" === direction && change < 0) change = (change + cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap; else if ("ccw" === direction && change > 0) change = (change - cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap;
            }
            plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
            pt.e = finalValue;
            pt.u = "deg";
            plugin._props.push(property);
            return pt;
        }, _assign = function _assign(target, source) {
            for (var p in source) target[p] = source[p];
            return target;
        }, _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
            var endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit, startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style;
            if (startCache.svg) {
                startValue = target.getAttribute("transform");
                target.setAttribute("transform", "");
                style[_transformProp] = transforms;
                endCache = _parseTransform(target, 1);
                _removeProperty(target, _transformProp);
                target.setAttribute("transform", startValue);
            } else {
                startValue = getComputedStyle(target)[_transformProp];
                style[_transformProp] = transforms;
                endCache = _parseTransform(target, 1);
                style[_transformProp] = startValue;
            }
            for (p in _transformProps) {
                startValue = startCache[p];
                endValue = endCache[p];
                if (startValue !== endValue && exclude.indexOf(p) < 0) {
                    startUnit = getUnit(startValue);
                    endUnit = getUnit(endValue);
                    startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
                    endNum = parseFloat(endValue);
                    plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
                    plugin._pt.u = endUnit || 0;
                    plugin._props.push(p);
                }
            }
            _assign(endCache, startCache);
        };
        _forEachName("padding,margin,Width,Radius", (function(name, index) {
            var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [ t, r, b, l ] : [ t + l, t + r, b + r, b + l ]).map((function(side) {
                return index < 2 ? name + side : "border" + side + name;
            }));
            _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
                var a, vars;
                if (arguments.length < 4) {
                    a = props.map((function(prop) {
                        return _get(plugin, prop, property);
                    }));
                    vars = a.join(" ");
                    return 5 === vars.split(a[0]).length ? a[0] : vars;
                }
                a = (endValue + "").split(" ");
                vars = {};
                props.forEach((function(prop, i) {
                    return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
                }));
                plugin.init(target, vars, tween);
            };
        }));
        var CSSPlugin = {
            name: "css",
            register: _initCore,
            targetTest: function targetTest(target) {
                return target.style && target.nodeType;
            },
            init: function init(target, vars, tween, index, targets) {
                var startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps, props = this._props, style = target.style, startAt = tween.vars.startAt;
                _pluginInitted || _initCore();
                this.styles = this.styles || _getStyleSaver(target);
                inlineProps = this.styles.props;
                this.tween = tween;
                for (p in vars) {
                    if ("autoRound" === p) continue;
                    endValue = vars[p];
                    if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) continue;
                    type = typeof endValue;
                    specialProp = _specialProps[p];
                    if ("function" === type) {
                        endValue = endValue.call(tween, index, target, targets);
                        type = typeof endValue;
                    }
                    if ("string" === type && ~endValue.indexOf("random(")) endValue = _replaceRandom(endValue);
                    if (specialProp) specialProp(this, target, p, endValue, tween) && (hasPriority = 1); else if ("--" === p.substr(0, 2)) {
                        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
                        endValue += "";
                        _colorExp.lastIndex = 0;
                        if (!_colorExp.test(startValue)) {
                            startUnit = getUnit(startValue);
                            endUnit = getUnit(endValue);
                        }
                        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
                        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
                        props.push(p);
                        inlineProps.push(p, 0, style[p]);
                    } else if ("undefined" !== type) {
                        if (startAt && p in startAt) {
                            startValue = "function" === typeof startAt[p] ? startAt[p].call(tween, index, target, targets) : startAt[p];
                            _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
                            getUnit(startValue + "") || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
                            "=" === (startValue + "").charAt(1) && (startValue = _get(target, p));
                        } else startValue = _get(target, p);
                        startNum = parseFloat(startValue);
                        relative = "string" === type && "=" === endValue.charAt(1) && endValue.substr(0, 2);
                        relative && (endValue = endValue.substr(2));
                        endNum = parseFloat(endValue);
                        if (p in _propertyAliases) {
                            if ("autoAlpha" === p) {
                                if (1 === startNum && "hidden" === _get(target, "visibility") && endNum) startNum = 0;
                                inlineProps.push("visibility", 0, style.visibility);
                                _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
                            }
                            if ("scale" !== p && "transform" !== p) {
                                p = _propertyAliases[p];
                                ~p.indexOf(",") && (p = p.split(",")[0]);
                            }
                        }
                        isTransformRelated = p in _transformProps;
                        if (isTransformRelated) {
                            this.styles.save(p);
                            if (!transformPropTween) {
                                cache = target._gsap;
                                cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
                                smooth = false !== vars.smoothOrigin && cache.smooth;
                                transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
                                transformPropTween.dep = 1;
                            }
                            if ("scale" === p) {
                                this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
                                this._pt.u = 0;
                                props.push("scaleY", p);
                                p += "X";
                            } else if ("transformOrigin" === p) {
                                inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
                                endValue = _convertKeywordsToPercentages(endValue);
                                if (cache.svg) _applySVGOrigin(target, endValue, 0, smooth, 0, this); else {
                                    endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                                    endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
                                    _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
                                }
                                continue;
                            } else if ("svgOrigin" === p) {
                                _applySVGOrigin(target, endValue, 1, smooth, 0, this);
                                continue;
                            } else if (p in _rotationalProperties) {
                                _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
                                continue;
                            } else if ("smoothOrigin" === p) {
                                _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
                                continue;
                            } else if ("force3D" === p) {
                                cache[p] = endValue;
                                continue;
                            } else if ("transform" === p) {
                                _addRawTransformPTs(this, endValue, target);
                                continue;
                            }
                        } else if (!(p in style)) p = _checkPropPrefix(p) || p;
                        if (isTransformRelated || (endNum || 0 === endNum) && (startNum || 0 === startNum) && !_complexExp.test(endValue) && p in style) {
                            startUnit = (startValue + "").substr((startNum + "").length);
                            endNum || (endNum = 0);
                            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
                            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
                            this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && ("px" === endUnit || "zIndex" === p) && false !== vars.autoRound ? _renderRoundedCSSProp : _renderCSSProp);
                            this._pt.u = endUnit || 0;
                            if (startUnit !== endUnit && "%" !== endUnit) {
                                this._pt.b = startValue;
                                this._pt.r = _renderCSSPropWithBeginning;
                            }
                        } else if (!(p in style)) {
                            if (p in target) this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets); else if ("parseTransform" !== p) {
                                _missingPlugin(p, endValue);
                                continue;
                            }
                        } else _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
                        isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
                        props.push(p);
                    }
                }
                hasPriority && _sortPropTweensByPriority(this);
            },
            render: function render(ratio, data) {
                if (data.tween._time || !CSSPlugin_reverting()) {
                    var pt = data._pt;
                    while (pt) {
                        pt.r(ratio, pt.d);
                        pt = pt._next;
                    }
                } else data.styles.revert();
            },
            get: _get,
            aliases: _propertyAliases,
            getSetter: function getSetter(target, property, plugin) {
                var p = _propertyAliases[property];
                p && p.indexOf(",") < 0 && (property = p);
                return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? "scale" === property ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && ("scale" === property ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
            },
            core: {
                _removeProperty,
                _getMatrix
            }
        };
        gsap.utils.checkPrefix = _checkPropPrefix;
        gsap.core.getStyleSaver = _getStyleSaver;
        (function(positionAndScale, rotation, others, aliases) {
            var all = _forEachName(positionAndScale + "," + rotation + "," + others, (function(name) {
                _transformProps[name] = 1;
            }));
            _forEachName(rotation, (function(name) {
                _config.units[name] = "deg";
                _rotationalProperties[name] = 1;
            }));
            _propertyAliases[all[13]] = positionAndScale + "," + rotation;
            _forEachName(aliases, (function(name) {
                var split = name.split(":");
                _propertyAliases[split[1]] = all[split[0]];
            }));
        })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
        _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(name) {
            _config.units[name] = "px";
        }));
        gsap.registerPlugin(CSSPlugin);
        var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
        gsapWithCSS.core.Tween;
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        /*!
 * Observer 3.11.4
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/        var Observer_gsap, Observer_coreInitted, Observer_win, Observer_doc, _docEl, _body, _isTouch, _pointerType, ScrollTrigger, _root, _normalizer, _eventTypes, Observer_context, _getGSAP = function _getGSAP() {
            return Observer_gsap || "undefined" !== typeof window && (Observer_gsap = window.gsap) && Observer_gsap.registerPlugin && Observer_gsap;
        }, _startup = 1, _observers = [], _scrollers = [], _proxies = [], _getTime = Date.now, _bridge = function _bridge(name, value) {
            return value;
        }, _integrate = function _integrate() {
            var core = ScrollTrigger.core, data = core.bridge || {}, scrollers = core._scrollers, proxies = core._proxies;
            scrollers.push.apply(scrollers, _scrollers);
            proxies.push.apply(proxies, _proxies);
            _scrollers = scrollers;
            _proxies = proxies;
            _bridge = function _bridge(name, value) {
                return data[name](value);
            };
        }, _getProxyProp = function _getProxyProp(element, property) {
            return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
        }, _isViewport = function _isViewport(el) {
            return !!~_root.indexOf(el);
        }, _addListener = function _addListener(element, type, func, nonPassive, capture) {
            return element.addEventListener(type, func, {
                passive: !nonPassive,
                capture: !!capture
            });
        }, _removeListener = function _removeListener(element, type, func, capture) {
            return element.removeEventListener(type, func, !!capture);
        }, _scrollLeft = "scrollLeft", _scrollTop = "scrollTop", _onScroll = function _onScroll() {
            return _normalizer && _normalizer.isPressed || _scrollers.cache++;
        }, _scrollCacheFunc = function _scrollCacheFunc(f, doNotCache) {
            var cachingFunc = function cachingFunc(value) {
                if (value || 0 === value) {
                    _startup && (Observer_win.history.scrollRestoration = "manual");
                    var isNormalizing = _normalizer && _normalizer.isPressed;
                    value = cachingFunc.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0);
                    f(value);
                    cachingFunc.cacheID = _scrollers.cache;
                    isNormalizing && _bridge("ss", value);
                } else if (doNotCache || _scrollers.cache !== cachingFunc.cacheID || _bridge("ref")) {
                    cachingFunc.cacheID = _scrollers.cache;
                    cachingFunc.v = f();
                }
                return cachingFunc.v + cachingFunc.offset;
            };
            cachingFunc.offset = 0;
            return f && cachingFunc;
        }, _horizontal = {
            s: _scrollLeft,
            p: "left",
            p2: "Left",
            os: "right",
            os2: "Right",
            d: "width",
            d2: "Width",
            a: "x",
            sc: _scrollCacheFunc((function(value) {
                return arguments.length ? Observer_win.scrollTo(value, _vertical.sc()) : Observer_win.pageXOffset || Observer_doc[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
            }))
        }, _vertical = {
            s: _scrollTop,
            p: "top",
            p2: "Top",
            os: "bottom",
            os2: "Bottom",
            d: "height",
            d2: "Height",
            a: "y",
            op: _horizontal,
            sc: _scrollCacheFunc((function(value) {
                return arguments.length ? Observer_win.scrollTo(_horizontal.sc(), value) : Observer_win.pageYOffset || Observer_doc[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
            }))
        }, _getTarget = function _getTarget(t) {
            return Observer_gsap.utils.toArray(t)[0] || ("string" === typeof t && false !== Observer_gsap.config().nullTargetWarn ? console.warn("Element not found:", t) : null);
        }, _getScrollFunc = function _getScrollFunc(element, _ref) {
            var s = _ref.s, sc = _ref.sc;
            _isViewport(element) && (element = Observer_doc.scrollingElement || _docEl);
            var i = _scrollers.indexOf(element), offset = sc === _vertical.sc ? 1 : 2;
            !~i && (i = _scrollers.push(element) - 1);
            _scrollers[i + offset] || element.addEventListener("scroll", _onScroll);
            var prev = _scrollers[i + offset], func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport(element) ? sc : _scrollCacheFunc((function(value) {
                return arguments.length ? element[s] = value : element[s];
            }))));
            func.target = element;
            prev || (func.smooth = "smooth" === Observer_gsap.getProperty(element, "scrollBehavior"));
            return func;
        }, _getVelocityProp = function _getVelocityProp(value, minTimeRefresh, useDelta) {
            var v1 = value, v2 = value, t1 = _getTime(), t2 = t1, min = minTimeRefresh || 50, dropToZeroTime = Math.max(500, 3 * min), update = function update(value, force) {
                var t = _getTime();
                if (force || t - t1 > min) {
                    v2 = v1;
                    v1 = value;
                    t2 = t1;
                    t1 = t;
                } else if (useDelta) v1 += value; else v1 = v2 + (value - v2) / (t - t2) * (t1 - t2);
            }, reset = function reset() {
                v2 = v1 = useDelta ? 0 : v1;
                t2 = t1 = 0;
            }, getVelocity = function getVelocity(latestValue) {
                var tOld = t2, vOld = v2, t = _getTime();
                (latestValue || 0 === latestValue) && latestValue !== v1 && update(latestValue);
                return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1e3;
            };
            return {
                update,
                reset,
                getVelocity
            };
        }, _getEvent = function _getEvent(e, preventDefault) {
            preventDefault && !e._gsapAllow && e.preventDefault();
            return e.changedTouches ? e.changedTouches[0] : e;
        }, _getAbsoluteMax = function _getAbsoluteMax(a) {
            var max = Math.max.apply(Math, a), min = Math.min.apply(Math, a);
            return Math.abs(max) >= Math.abs(min) ? max : min;
        }, _setScrollTrigger = function _setScrollTrigger() {
            ScrollTrigger = Observer_gsap.core.globals().ScrollTrigger;
            ScrollTrigger && ScrollTrigger.core && _integrate();
        }, Observer_initCore = function _initCore(core) {
            Observer_gsap = core || _getGSAP();
            if (Observer_gsap && "undefined" !== typeof document && document.body) {
                Observer_win = window;
                Observer_doc = document;
                _docEl = Observer_doc.documentElement;
                _body = Observer_doc.body;
                _root = [ Observer_win, Observer_doc, _docEl, _body ];
                Observer_gsap.utils.clamp;
                Observer_context = Observer_gsap.core.context || function() {};
                _pointerType = "onpointerenter" in _body ? "pointer" : "mouse";
                _isTouch = Observer_Observer.isTouch = Observer_win.matchMedia && Observer_win.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Observer_win || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
                _eventTypes = Observer_Observer.eventTypes = ("ontouchstart" in _docEl ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
                setTimeout((function() {
                    return _startup = 0;
                }), 500);
                _setScrollTrigger();
                Observer_coreInitted = 1;
            }
            return Observer_coreInitted;
        };
        _horizontal.op = _vertical;
        _scrollers.cache = 0;
        var Observer_Observer = function() {
            function Observer(vars) {
                this.init(vars);
            }
            var _proto = Observer.prototype;
            _proto.init = function init(vars) {
                Observer_coreInitted || Observer_initCore(Observer_gsap) || console.warn("Please gsap.registerPlugin(Observer)");
                ScrollTrigger || _setScrollTrigger();
                var tolerance = vars.tolerance, dragMinimum = vars.dragMinimum, type = vars.type, target = vars.target, lineHeight = vars.lineHeight, debounce = vars.debounce, preventDefault = vars.preventDefault, onStop = vars.onStop, onStopDelay = vars.onStopDelay, ignore = vars.ignore, wheelSpeed = vars.wheelSpeed, event = vars.event, onDragStart = vars.onDragStart, onDragEnd = vars.onDragEnd, onDrag = vars.onDrag, onPress = vars.onPress, onRelease = vars.onRelease, onRight = vars.onRight, onLeft = vars.onLeft, onUp = vars.onUp, onDown = vars.onDown, onChangeX = vars.onChangeX, onChangeY = vars.onChangeY, onChange = vars.onChange, onToggleX = vars.onToggleX, onToggleY = vars.onToggleY, onHover = vars.onHover, onHoverEnd = vars.onHoverEnd, onMove = vars.onMove, ignoreCheck = vars.ignoreCheck, isNormalizer = vars.isNormalizer, onGestureStart = vars.onGestureStart, onGestureEnd = vars.onGestureEnd, onWheel = vars.onWheel, onEnable = vars.onEnable, onDisable = vars.onDisable, onClick = vars.onClick, scrollSpeed = vars.scrollSpeed, capture = vars.capture, allowClicks = vars.allowClicks, lockAxis = vars.lockAxis, onLockAxis = vars.onLockAxis;
                this.target = target = _getTarget(target) || _docEl;
                this.vars = vars;
                ignore && (ignore = Observer_gsap.utils.toArray(ignore));
                tolerance = tolerance || 1e-9;
                dragMinimum = dragMinimum || 0;
                wheelSpeed = wheelSpeed || 1;
                scrollSpeed = scrollSpeed || 1;
                type = type || "wheel,touch,pointer";
                debounce = false !== debounce;
                lineHeight || (lineHeight = parseFloat(Observer_win.getComputedStyle(_body).lineHeight) || 22);
                var id, onStopDelayedCall, dragged, moved, wheeled, locked, axis, self = this, prevDeltaX = 0, prevDeltaY = 0, scrollFuncX = _getScrollFunc(target, _horizontal), scrollFuncY = _getScrollFunc(target, _vertical), scrollX = scrollFuncX(), scrollY = scrollFuncY(), limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && "pointerdown" === _eventTypes[0], isViewport = _isViewport(target), ownerDoc = target.ownerDocument || Observer_doc, deltaX = [ 0, 0, 0 ], deltaY = [ 0, 0, 0 ], onClickTime = 0, clickCapture = function clickCapture() {
                    return onClickTime = _getTime();
                }, _ignoreCheck = function _ignoreCheck(e, isPointerOrTouch) {
                    return (self.event = e) && ignore && ~ignore.indexOf(e.target) || isPointerOrTouch && limitToTouch && "touch" !== e.pointerType || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
                }, onStopFunc = function onStopFunc() {
                    self._vx.reset();
                    self._vy.reset();
                    onStopDelayedCall.pause();
                    onStop && onStop(self);
                }, update = function update() {
                    var dx = self.deltaX = _getAbsoluteMax(deltaX), dy = self.deltaY = _getAbsoluteMax(deltaY), changedX = Math.abs(dx) >= tolerance, changedY = Math.abs(dy) >= tolerance;
                    onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY);
                    if (changedX) {
                        onRight && self.deltaX > 0 && onRight(self);
                        onLeft && self.deltaX < 0 && onLeft(self);
                        onChangeX && onChangeX(self);
                        onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
                        prevDeltaX = self.deltaX;
                        deltaX[0] = deltaX[1] = deltaX[2] = 0;
                    }
                    if (changedY) {
                        onDown && self.deltaY > 0 && onDown(self);
                        onUp && self.deltaY < 0 && onUp(self);
                        onChangeY && onChangeY(self);
                        onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
                        prevDeltaY = self.deltaY;
                        deltaY[0] = deltaY[1] = deltaY[2] = 0;
                    }
                    if (moved || dragged) {
                        onMove && onMove(self);
                        if (dragged) {
                            onDrag(self);
                            dragged = false;
                        }
                        moved = false;
                    }
                    locked && !(locked = false) && onLockAxis && onLockAxis(self);
                    if (wheeled) {
                        onWheel(self);
                        wheeled = false;
                    }
                    id = 0;
                }, onDelta = function onDelta(x, y, index) {
                    deltaX[index] += x;
                    deltaY[index] += y;
                    self._vx.update(x);
                    self._vy.update(y);
                    debounce ? id || (id = requestAnimationFrame(update)) : update();
                }, onTouchOrPointerDelta = function onTouchOrPointerDelta(x, y) {
                    if (lockAxis && !axis) {
                        self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
                        locked = true;
                    }
                    if ("y" !== axis) {
                        deltaX[2] += x;
                        self._vx.update(x, true);
                    }
                    if ("x" !== axis) {
                        deltaY[2] += y;
                        self._vy.update(y, true);
                    }
                    debounce ? id || (id = requestAnimationFrame(update)) : update();
                }, _onDrag = function _onDrag(e) {
                    if (_ignoreCheck(e, 1)) return;
                    e = _getEvent(e, preventDefault);
                    var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y, isDragging = self.isDragging;
                    self.x = x;
                    self.y = y;
                    if (isDragging || Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum) {
                        onDrag && (dragged = true);
                        isDragging || (self.isDragging = true);
                        onTouchOrPointerDelta(dx, dy);
                        isDragging || onDragStart && onDragStart(self);
                    }
                }, _onPress = self.onPress = function(e) {
                    if (_ignoreCheck(e, 1)) return;
                    self.axis = axis = null;
                    onStopDelayedCall.pause();
                    self.isPressed = true;
                    e = _getEvent(e);
                    prevDeltaX = prevDeltaY = 0;
                    self.startX = self.x = e.clientX;
                    self.startY = self.y = e.clientY;
                    self._vx.reset();
                    self._vy.reset();
                    _addListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, preventDefault, true);
                    self.deltaX = self.deltaY = 0;
                    onPress && onPress(self);
                }, _onRelease = function _onRelease(e) {
                    if (_ignoreCheck(e, 1)) return;
                    _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
                    var isTrackingDrag = !isNaN(self.y - self.startY), wasDragging = self.isDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3), eventData = _getEvent(e);
                    if (!wasDragging && isTrackingDrag) {
                        self._vx.reset();
                        self._vy.reset();
                        if (preventDefault && allowClicks) Observer_gsap.delayedCall(.08, (function() {
                            if (_getTime() - onClickTime > 300 && !e.defaultPrevented) if (e.target.click) e.target.click(); else if (ownerDoc.createEvent) {
                                var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                                syntheticEvent.initMouseEvent("click", true, true, Observer_win, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                                e.target.dispatchEvent(syntheticEvent);
                            }
                        }));
                    }
                    self.isDragging = self.isGesturing = self.isPressed = false;
                    onStop && !isNormalizer && onStopDelayedCall.restart(true);
                    onDragEnd && wasDragging && onDragEnd(self);
                    onRelease && onRelease(self, wasDragging);
                }, _onGestureStart = function _onGestureStart(e) {
                    return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
                }, _onGestureEnd = function _onGestureEnd() {
                    return (self.isGesturing = false) || onGestureEnd(self);
                }, onScroll = function onScroll(e) {
                    if (_ignoreCheck(e)) return;
                    var x = scrollFuncX(), y = scrollFuncY();
                    onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
                    scrollX = x;
                    scrollY = y;
                    onStop && onStopDelayedCall.restart(true);
                }, _onWheel = function _onWheel(e) {
                    if (_ignoreCheck(e)) return;
                    e = _getEvent(e, preventDefault);
                    onWheel && (wheeled = true);
                    var multiplier = (1 === e.deltaMode ? lineHeight : 2 === e.deltaMode ? Observer_win.innerHeight : 1) * wheelSpeed;
                    onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
                    onStop && !isNormalizer && onStopDelayedCall.restart(true);
                }, _onMove = function _onMove(e) {
                    if (_ignoreCheck(e)) return;
                    var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y;
                    self.x = x;
                    self.y = y;
                    moved = true;
                    (dx || dy) && onTouchOrPointerDelta(dx, dy);
                }, _onHover = function _onHover(e) {
                    self.event = e;
                    onHover(self);
                }, _onHoverEnd = function _onHoverEnd(e) {
                    self.event = e;
                    onHoverEnd(self);
                }, _onClick = function _onClick(e) {
                    return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
                };
                onStopDelayedCall = self._dc = Observer_gsap.delayedCall(onStopDelay || .25, onStopFunc).pause();
                self.deltaX = self.deltaY = 0;
                self._vx = _getVelocityProp(0, 50, true);
                self._vy = _getVelocityProp(0, 50, true);
                self.scrollX = scrollFuncX;
                self.scrollY = scrollFuncY;
                self.isDragging = self.isGesturing = self.isPressed = false;
                Observer_context(this);
                self.enable = function(e) {
                    if (!self.isEnabled) {
                        _addListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
                        type.indexOf("scroll") >= 0 && _addListener(isViewport ? ownerDoc : target, "scroll", onScroll, preventDefault, capture);
                        type.indexOf("wheel") >= 0 && _addListener(target, "wheel", _onWheel, preventDefault, capture);
                        if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
                            _addListener(target, _eventTypes[0], _onPress, preventDefault, capture);
                            _addListener(ownerDoc, _eventTypes[2], _onRelease);
                            _addListener(ownerDoc, _eventTypes[3], _onRelease);
                            allowClicks && _addListener(target, "click", clickCapture, false, true);
                            onClick && _addListener(target, "click", _onClick);
                            onGestureStart && _addListener(ownerDoc, "gesturestart", _onGestureStart);
                            onGestureEnd && _addListener(ownerDoc, "gestureend", _onGestureEnd);
                            onHover && _addListener(target, _pointerType + "enter", _onHover);
                            onHoverEnd && _addListener(target, _pointerType + "leave", _onHoverEnd);
                            onMove && _addListener(target, _pointerType + "move", _onMove);
                        }
                        self.isEnabled = true;
                        e && e.type && _onPress(e);
                        onEnable && onEnable(self);
                    }
                    return self;
                };
                self.disable = function() {
                    if (self.isEnabled) {
                        _observers.filter((function(o) {
                            return o !== self && _isViewport(o.target);
                        })).length || _removeListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
                        if (self.isPressed) {
                            self._vx.reset();
                            self._vy.reset();
                            _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
                        }
                        _removeListener(isViewport ? ownerDoc : target, "scroll", onScroll, capture);
                        _removeListener(target, "wheel", _onWheel, capture);
                        _removeListener(target, _eventTypes[0], _onPress, capture);
                        _removeListener(ownerDoc, _eventTypes[2], _onRelease);
                        _removeListener(ownerDoc, _eventTypes[3], _onRelease);
                        _removeListener(target, "click", clickCapture, true);
                        _removeListener(target, "click", _onClick);
                        _removeListener(ownerDoc, "gesturestart", _onGestureStart);
                        _removeListener(ownerDoc, "gestureend", _onGestureEnd);
                        _removeListener(target, _pointerType + "enter", _onHover);
                        _removeListener(target, _pointerType + "leave", _onHoverEnd);
                        _removeListener(target, _pointerType + "move", _onMove);
                        self.isEnabled = self.isPressed = self.isDragging = false;
                        onDisable && onDisable(self);
                    }
                };
                self.kill = self.revert = function() {
                    self.disable();
                    var i = _observers.indexOf(self);
                    i >= 0 && _observers.splice(i, 1);
                    _normalizer === self && (_normalizer = 0);
                };
                _observers.push(self);
                isNormalizer && _isViewport(target) && (_normalizer = self);
                self.enable(event);
            };
            _createClass(Observer, [ {
                key: "velocityX",
                get: function get() {
                    return this._vx.getVelocity();
                }
            }, {
                key: "velocityY",
                get: function get() {
                    return this._vy.getVelocity();
                }
            } ]);
            return Observer;
        }();
        Observer_Observer.version = "3.11.4";
        Observer_Observer.create = function(vars) {
            return new Observer_Observer(vars);
        };
        Observer_Observer.register = Observer_initCore;
        Observer_Observer.getAll = function() {
            return _observers.slice();
        };
        Observer_Observer.getById = function(id) {
            return _observers.filter((function(o) {
                return o.vars.id === id;
            }))[0];
        };
        _getGSAP() && Observer_gsap.registerPlugin(Observer_Observer);
        /*!
 * ScrollTrigger 3.11.4
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
        var ScrollTrigger_gsap, ScrollTrigger_coreInitted, ScrollTrigger_win, ScrollTrigger_doc, ScrollTrigger_docEl, ScrollTrigger_body, ScrollTrigger_root, _resizeDelay, _toArray, ScrollTrigger_clamp, _time2, _syncInterval, _refreshing, _pointerIsDown, ScrollTrigger_transformProp, _i, _prevWidth, _prevHeight, _autoRefresh, _sort, ScrollTrigger_suppressOverwrites, _ignoreResize, ScrollTrigger_normalizer, _ignoreMobileResize, _baseScreenHeight, _baseScreenWidth, _fixIOSBug, ScrollTrigger_context, _scrollRestoration, _limitCallbacks, _rafID, _refreshingAll, _queueRefreshID, _primary, ScrollTrigger_startup = 1, ScrollTrigger_getTime = Date.now, _time1 = ScrollTrigger_getTime(), _lastScrollTime = 0, _enabled = 0, _pointerDownHandler = function _pointerDownHandler() {
            return _pointerIsDown = 1;
        }, _pointerUpHandler = function _pointerUpHandler() {
            return _pointerIsDown = 0;
        }, ScrollTrigger_passThrough = function _passThrough(v) {
            return v;
        }, ScrollTrigger_round = function _round(value) {
            return Math.round(1e5 * value) / 1e5 || 0;
        }, ScrollTrigger_windowExists = function _windowExists() {
            return "undefined" !== typeof window;
        }, ScrollTrigger_getGSAP = function _getGSAP() {
            return ScrollTrigger_gsap || ScrollTrigger_windowExists() && (ScrollTrigger_gsap = window.gsap) && ScrollTrigger_gsap.registerPlugin && ScrollTrigger_gsap;
        }, ScrollTrigger_isViewport = function _isViewport(e) {
            return !!~ScrollTrigger_root.indexOf(e);
        }, _getBoundsFunc = function _getBoundsFunc(element) {
            return _getProxyProp(element, "getBoundingClientRect") || (ScrollTrigger_isViewport(element) ? function() {
                _winOffsets.width = ScrollTrigger_win.innerWidth;
                _winOffsets.height = ScrollTrigger_win.innerHeight;
                return _winOffsets;
            } : function() {
                return _getBounds(element);
            });
        }, _getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref) {
            var d = _ref.d, d2 = _ref.d2, a = _ref.a;
            return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function() {
                return a()[d];
            } : function() {
                return (isViewport ? ScrollTrigger_win["inner" + d2] : scroller["client" + d2]) || 0;
            };
        }, _getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
            return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function() {
                return _winOffsets;
            };
        }, _maxScroll = function _maxScroll(element, _ref2) {
            var s = _ref2.s, d2 = _ref2.d2, d = _ref2.d, a = _ref2.a;
            return (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : ScrollTrigger_isViewport(element) ? (ScrollTrigger_docEl[s] || ScrollTrigger_body[s]) - (ScrollTrigger_win["inner" + d2] || ScrollTrigger_docEl["client" + d2] || ScrollTrigger_body["client" + d2]) : element[s] - element["offset" + d2];
        }, _iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
            for (var i = 0; i < _autoRefresh.length; i += 3) (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
        }, ScrollTrigger_isString = function _isString(value) {
            return "string" === typeof value;
        }, ScrollTrigger_isFunction = function _isFunction(value) {
            return "function" === typeof value;
        }, ScrollTrigger_isNumber = function _isNumber(value) {
            return "number" === typeof value;
        }, ScrollTrigger_isObject = function _isObject(value) {
            return "object" === typeof value;
        }, _endAnimation = function _endAnimation(animation, reversed, pause) {
            return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
        }, ScrollTrigger_callback = function _callback(self, func) {
            if (self.enabled) {
                var result = func(self);
                result && result.totalTime && (self.callbackAnimation = result);
            }
        }, _abs = Math.abs, _left = "left", _top = "top", _right = "right", _bottom = "bottom", _width = "width", _height = "height", _Right = "Right", _Left = "Left", _Top = "Top", _Bottom = "Bottom", _padding = "padding", _margin = "margin", _Width = "Width", _Height = "Height", _px = "px", _getComputedStyle = function _getComputedStyle(element) {
            return ScrollTrigger_win.getComputedStyle(element);
        }, _makePositionable = function _makePositionable(element) {
            var position = _getComputedStyle(element).position;
            element.style.position = "absolute" === position || "fixed" === position ? position : "relative";
        }, ScrollTrigger_setDefaults = function _setDefaults(obj, defaults) {
            for (var p in defaults) p in obj || (obj[p] = defaults[p]);
            return obj;
        }, _getBounds = function _getBounds(element, withoutTransforms) {
            var tween = withoutTransforms && "matrix(1, 0, 0, 1, 0, 0)" !== _getComputedStyle(element)[ScrollTrigger_transformProp] && ScrollTrigger_gsap.to(element, {
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                rotation: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                skewX: 0,
                skewY: 0
            }).progress(1), bounds = element.getBoundingClientRect();
            tween && tween.progress(0).kill();
            return bounds;
        }, _getSize = function _getSize(element, _ref3) {
            var d2 = _ref3.d2;
            return element["offset" + d2] || element["client" + d2] || 0;
        }, _getLabelRatioArray = function _getLabelRatioArray(timeline) {
            var p, a = [], labels = timeline.labels, duration = timeline.duration();
            for (p in labels) a.push(labels[p] / duration);
            return a;
        }, _getClosestLabel = function _getClosestLabel(animation) {
            return function(value) {
                return ScrollTrigger_gsap.utils.snap(_getLabelRatioArray(animation), value);
            };
        }, _snapDirectional = function _snapDirectional(snapIncrementOrArray) {
            var snap = ScrollTrigger_gsap.utils.snap(snapIncrementOrArray), a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort((function(a, b) {
                return a - b;
            }));
            return a ? function(value, direction, threshold) {
                if (void 0 === threshold) threshold = .001;
                var i;
                if (!direction) return snap(value);
                if (direction > 0) {
                    value -= threshold;
                    for (i = 0; i < a.length; i++) if (a[i] >= value) return a[i];
                    return a[i - 1];
                } else {
                    i = a.length;
                    value += threshold;
                    while (i--) if (a[i] <= value) return a[i];
                }
                return a[0];
            } : function(value, direction, threshold) {
                if (void 0 === threshold) threshold = .001;
                var snapped = snap(value);
                return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
            };
        }, _getLabelAtDirection = function _getLabelAtDirection(timeline) {
            return function(value, st) {
                return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
            };
        }, _multiListener = function _multiListener(func, element, types, callback) {
            return types.split(",").forEach((function(type) {
                return func(element, type, callback);
            }));
        }, ScrollTrigger_addListener = function _addListener(element, type, func, nonPassive, capture) {
            return element.addEventListener(type, func, {
                passive: !nonPassive,
                capture: !!capture
            });
        }, ScrollTrigger_removeListener = function _removeListener(element, type, func, capture) {
            return element.removeEventListener(type, func, !!capture);
        }, _wheelListener = function _wheelListener(func, el, scrollFunc) {
            return scrollFunc && scrollFunc.wheelHandler && func(el, "wheel", scrollFunc);
        }, _markerDefaults = {
            startColor: "green",
            endColor: "red",
            indent: 0,
            fontSize: "16px",
            fontWeight: "normal"
        }, ScrollTrigger_defaults = {
            toggleActions: "play",
            anticipatePin: 0
        }, _keywords = {
            top: 0,
            left: 0,
            center: .5,
            bottom: 1,
            right: 1
        }, _offsetToPx = function _offsetToPx(value, size) {
            if (ScrollTrigger_isString(value)) {
                var eqIndex = value.indexOf("="), relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
                if (~eqIndex) {
                    value.indexOf("%") > eqIndex && (relative *= size / 100);
                    value = value.substr(0, eqIndex - 1);
                }
                value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
            }
            return value;
        }, _createMarker = function _createMarker(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
            var startColor = _ref4.startColor, endColor = _ref4.endColor, fontSize = _ref4.fontSize, indent = _ref4.indent, fontWeight = _ref4.fontWeight;
            var e = ScrollTrigger_doc.createElement("div"), useFixedPosition = ScrollTrigger_isViewport(container) || "fixed" === _getProxyProp(container, "pinType"), isScroller = -1 !== type.indexOf("scroller"), parent = useFixedPosition ? ScrollTrigger_body : container, isStart = -1 !== type.indexOf("start"), color = isStart ? startColor : endColor, css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
            css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
            (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
            matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
            e._isStart = isStart;
            e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
            e.style.cssText = css;
            e.innerText = name || 0 === name ? type + "-" + name : type;
            parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
            e._offset = e["offset" + direction.op.d2];
            _positionMarker(e, 0, direction, isStart);
            return e;
        }, _positionMarker = function _positionMarker(marker, start, direction, flipped) {
            var vars = {
                display: "block"
            }, side = direction[flipped ? "os2" : "p2"], oppositeSide = direction[flipped ? "p2" : "os2"];
            marker._isFlipped = flipped;
            vars[direction.a + "Percent"] = flipped ? -100 : 0;
            vars[direction.a] = flipped ? "1px" : 0;
            vars["border" + side + _Width] = 1;
            vars["border" + oppositeSide + _Width] = 0;
            vars[direction.p] = start + "px";
            ScrollTrigger_gsap.set(marker, vars);
        }, _triggers = [], _ids = {}, _sync = function _sync() {
            return ScrollTrigger_getTime() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
        }, ScrollTrigger_onScroll = function _onScroll() {
            if (!ScrollTrigger_normalizer || !ScrollTrigger_normalizer.isPressed || ScrollTrigger_normalizer.startX > ScrollTrigger_body.clientWidth) {
                _scrollers.cache++;
                if (ScrollTrigger_normalizer) _rafID || (_rafID = requestAnimationFrame(_updateAll)); else _updateAll();
                _lastScrollTime || ScrollTrigger_dispatch("scrollStart");
                _lastScrollTime = ScrollTrigger_getTime();
            }
        }, _setBaseDimensions = function _setBaseDimensions() {
            _baseScreenWidth = ScrollTrigger_win.innerWidth;
            _baseScreenHeight = ScrollTrigger_win.innerHeight;
        }, _onResize = function _onResize() {
            _scrollers.cache++;
            !_refreshing && !_ignoreResize && !ScrollTrigger_doc.fullscreenElement && !ScrollTrigger_doc.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== ScrollTrigger_win.innerWidth || Math.abs(ScrollTrigger_win.innerHeight - _baseScreenHeight) > .25 * ScrollTrigger_win.innerHeight) && _resizeDelay.restart(true);
        }, ScrollTrigger_listeners = {}, ScrollTrigger_emptyArray = [], _softRefresh = function _softRefresh() {
            return ScrollTrigger_removeListener(ScrollTrigger_ScrollTrigger, "scrollEnd", _softRefresh) || _refreshAll(true);
        }, ScrollTrigger_dispatch = function _dispatch(type) {
            return ScrollTrigger_listeners[type] && ScrollTrigger_listeners[type].map((function(f) {
                return f();
            })) || ScrollTrigger_emptyArray;
        }, _savedStyles = [], _revertRecorded = function _revertRecorded(media) {
            for (var i = 0; i < _savedStyles.length; i += 5) if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
                _savedStyles[i].style.cssText = _savedStyles[i + 1];
                _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
                _savedStyles[i + 3].uncache = 1;
            }
        }, _revertAll = function _revertAll(kill, media) {
            var trigger;
            for (_i = 0; _i < _triggers.length; _i++) {
                trigger = _triggers[_i];
                if (trigger && (!media || trigger._ctx === media)) if (kill) trigger.kill(1); else trigger.revert(true, true);
            }
            media && _revertRecorded(media);
            media || ScrollTrigger_dispatch("revert");
        }, _clearScrollMemory = function _clearScrollMemory(scrollRestoration, force) {
            _scrollers.cache++;
            (force || !_refreshingAll) && _scrollers.forEach((function(obj) {
                return ScrollTrigger_isFunction(obj) && obj.cacheID++ && (obj.rec = 0);
            }));
            ScrollTrigger_isString(scrollRestoration) && (ScrollTrigger_win.history.scrollRestoration = _scrollRestoration = scrollRestoration);
        }, _refreshID = 0, _queueRefreshAll = function _queueRefreshAll() {
            if (_queueRefreshID !== _refreshID) {
                var id = _queueRefreshID = _refreshID;
                requestAnimationFrame((function() {
                    return id === _refreshID && _refreshAll(true);
                }));
            }
        }, _refreshAll = function _refreshAll(force, skipRevert) {
            if (_lastScrollTime && !force) {
                ScrollTrigger_addListener(ScrollTrigger_ScrollTrigger, "scrollEnd", _softRefresh);
                return;
            }
            _refreshingAll = ScrollTrigger_ScrollTrigger.isRefreshing = true;
            _scrollers.forEach((function(obj) {
                return ScrollTrigger_isFunction(obj) && obj.cacheID++ && (obj.rec = obj());
            }));
            var refreshInits = ScrollTrigger_dispatch("refreshInit");
            _sort && ScrollTrigger_ScrollTrigger.sort();
            skipRevert || _revertAll();
            _scrollers.forEach((function(obj) {
                if (ScrollTrigger_isFunction(obj)) {
                    obj.smooth && (obj.target.style.scrollBehavior = "auto");
                    obj(0);
                }
            }));
            _triggers.slice(0).forEach((function(t) {
                return t.refresh();
            }));
            _triggers.forEach((function(t, i) {
                if (t._subPinOffset && t.pin) {
                    var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight", original = t.pin[prop];
                    t.revert(true, 1);
                    t.adjustPinSpacing(t.pin[prop] - original);
                    t.revert(false, 1);
                }
            }));
            _triggers.forEach((function(t) {
                return "max" === t.vars.end && t.setPositions(t.start, Math.max(t.start + 1, _maxScroll(t.scroller, t._dir)));
            }));
            refreshInits.forEach((function(result) {
                return result && result.render && result.render(-1);
            }));
            _scrollers.forEach((function(obj) {
                if (ScrollTrigger_isFunction(obj)) {
                    obj.smooth && requestAnimationFrame((function() {
                        return obj.target.style.scrollBehavior = "smooth";
                    }));
                    obj.rec && obj(obj.rec);
                }
            }));
            _clearScrollMemory(_scrollRestoration, 1);
            _resizeDelay.pause();
            _refreshID++;
            _updateAll(2);
            _triggers.forEach((function(t) {
                return ScrollTrigger_isFunction(t.vars.onRefresh) && t.vars.onRefresh(t);
            }));
            _refreshingAll = ScrollTrigger_ScrollTrigger.isRefreshing = false;
            ScrollTrigger_dispatch("refresh");
        }, _lastScroll = 0, _direction = 1, _updateAll = function _updateAll(force) {
            if (!_refreshingAll || 2 === force) {
                ScrollTrigger_ScrollTrigger.isUpdating = true;
                _primary && _primary.update(0);
                var l = _triggers.length, time = ScrollTrigger_getTime(), recordVelocity = time - _time1 >= 50, scroll = l && _triggers[0].scroll();
                _direction = _lastScroll > scroll ? -1 : 1;
                _lastScroll = scroll;
                if (recordVelocity) {
                    if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
                        _lastScrollTime = 0;
                        ScrollTrigger_dispatch("scrollEnd");
                    }
                    _time2 = _time1;
                    _time1 = time;
                }
                if (_direction < 0) {
                    _i = l;
                    while (_i-- > 0) _triggers[_i] && _triggers[_i].update(0, recordVelocity);
                    _direction = 1;
                } else for (_i = 0; _i < l; _i++) _triggers[_i] && _triggers[_i].update(0, recordVelocity);
                ScrollTrigger_ScrollTrigger.isUpdating = false;
            }
            _rafID = 0;
        }, _propNamesToCopy = [ _left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order" ], _stateProps = _propNamesToCopy.concat([ _width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left ]), _swapPinOut = function _swapPinOut(pin, spacer, state) {
            _setState(state);
            var cache = pin._gsap;
            if (cache.spacerIsNative) _setState(cache.spacerState); else if (pin._gsap.swappedIn) {
                var parent = spacer.parentNode;
                if (parent) {
                    parent.insertBefore(pin, spacer);
                    parent.removeChild(spacer);
                }
            }
            pin._gsap.swappedIn = false;
        }, _swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
            if (!pin._gsap.swappedIn) {
                var p, i = _propNamesToCopy.length, spacerStyle = spacer.style, pinStyle = pin.style;
                while (i--) {
                    p = _propNamesToCopy[i];
                    spacerStyle[p] = cs[p];
                }
                spacerStyle.position = "absolute" === cs.position ? "absolute" : "relative";
                "inline" === cs.display && (spacerStyle.display = "inline-block");
                pinStyle[_bottom] = pinStyle[_right] = "auto";
                spacerStyle.flexBasis = cs.flexBasis || "auto";
                spacerStyle.overflow = "visible";
                spacerStyle.boxSizing = "border-box";
                spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
                spacerStyle[_height] = _getSize(pin, _vertical) + _px;
                spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
                _setState(spacerState);
                pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
                pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
                pinStyle[_padding] = cs[_padding];
                if (pin.parentNode !== spacer) {
                    pin.parentNode.insertBefore(spacer, pin);
                    spacer.appendChild(pin);
                }
                pin._gsap.swappedIn = true;
            }
        }, ScrollTrigger_capsExp = /([A-Z])/g, _setState = function _setState(state) {
            if (state) {
                var p, value, style = state.t.style, l = state.length, i = 0;
                (state.t._gsap || ScrollTrigger_gsap.core.getCache(state.t)).uncache = 1;
                for (;i < l; i += 2) {
                    value = state[i + 1];
                    p = state[i];
                    if (value) style[p] = value; else if (style[p]) style.removeProperty(p.replace(ScrollTrigger_capsExp, "-$1").toLowerCase());
                }
            }
        }, _getState = function _getState(element) {
            var l = _stateProps.length, style = element.style, state = [], i = 0;
            for (;i < l; i++) state.push(_stateProps[i], style[_stateProps[i]]);
            state.t = element;
            return state;
        }, _copyState = function _copyState(state, override, omitOffsets) {
            var p, result = [], l = state.length, i = omitOffsets ? 8 : 0;
            for (;i < l; i += 2) {
                p = state[i];
                result.push(p, p in override ? override[p] : state[i + 1]);
            }
            result.t = state.t;
            return result;
        }, _winOffsets = {
            left: 0,
            top: 0
        }, ScrollTrigger_parsePosition = function _parsePosition(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation) {
            ScrollTrigger_isFunction(value) && (value = value(self));
            if (ScrollTrigger_isString(value) && "max" === value.substr(0, 3)) value = scrollerMax + ("=" === value.charAt(4) ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
            var p1, p2, element, time = containerAnimation ? containerAnimation.time() : 0;
            containerAnimation && containerAnimation.seek(0);
            if (!ScrollTrigger_isNumber(value)) {
                ScrollTrigger_isFunction(trigger) && (trigger = trigger(self));
                var bounds, localOffset, globalOffset, display, offsets = (value || "0").split(" ");
                element = _getTarget(trigger) || ScrollTrigger_body;
                bounds = _getBounds(element) || {};
                if ((!bounds || !bounds.left && !bounds.top) && "none" === _getComputedStyle(element).display) {
                    display = element.style.display;
                    element.style.display = "block";
                    bounds = _getBounds(element);
                    display ? element.style.display = display : element.style.removeProperty("display");
                }
                localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
                globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
                value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
                markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
                scrollerSize -= scrollerSize - globalOffset;
            } else if (markerScroller) _positionMarker(markerScroller, scrollerSize, direction, true);
            if (marker) {
                var position = value + scrollerSize, isStart = marker._isStart;
                p1 = "scroll" + direction.d2;
                _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(ScrollTrigger_body[p1], ScrollTrigger_docEl[p1]) : marker.parentNode[p1]) <= position + 1);
                if (useFixedPosition) {
                    scrollerBounds = _getBounds(markerScroller);
                    useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
                }
            }
            if (containerAnimation && element) {
                p1 = _getBounds(element);
                containerAnimation.seek(scrollerMax);
                p2 = _getBounds(element);
                containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
                value = value / containerAnimation._caScrollDist * scrollerMax;
            }
            containerAnimation && containerAnimation.seek(time);
            return containerAnimation ? value : Math.round(value);
        }, _prefixExp = /(webkit|moz|length|cssText|inset)/i, _reparent = function _reparent(element, parent, top, left) {
            if (element.parentNode !== parent) {
                var p, cs, style = element.style;
                if (parent === ScrollTrigger_body) {
                    element._stOrig = style.cssText;
                    cs = _getComputedStyle(element);
                    for (p in cs) if (!+p && !_prefixExp.test(p) && cs[p] && "string" === typeof style[p] && "0" !== p) style[p] = cs[p];
                    style.top = top;
                    style.left = left;
                } else style.cssText = element._stOrig;
                ScrollTrigger_gsap.core.getCache(element).uncache = 1;
                parent.appendChild(element);
            }
        }, _getTweenCreator = function _getTweenCreator(scroller, direction) {
            var lastScroll1, lastScroll2, getScroll = _getScrollFunc(scroller, direction), prop = "_scroll" + direction.p2, getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
                var tween = getTween.tween, onComplete = vars.onComplete, modifiers = {};
                initialValue = initialValue || getScroll();
                change2 = change1 && change2 || 0;
                change1 = change1 || scrollTo - initialValue;
                tween && tween.kill();
                lastScroll1 = Math.round(initialValue);
                vars[prop] = scrollTo;
                vars.modifiers = modifiers;
                modifiers[prop] = function(value) {
                    value = Math.round(getScroll());
                    if (value !== lastScroll1 && value !== lastScroll2 && Math.abs(value - lastScroll1) > 3 && Math.abs(value - lastScroll2) > 3) {
                        tween.kill();
                        getTween.tween = 0;
                    } else value = initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio;
                    lastScroll2 = lastScroll1;
                    return lastScroll1 = Math.round(value);
                };
                vars.onUpdate = function() {
                    _scrollers.cache++;
                    _updateAll();
                };
                vars.onComplete = function() {
                    getTween.tween = 0;
                    onComplete && onComplete.call(tween);
                };
                tween = getTween.tween = ScrollTrigger_gsap.to(scroller, vars);
                return tween;
            };
            scroller[prop] = getScroll;
            getScroll.wheelHandler = function() {
                return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
            };
            ScrollTrigger_addListener(scroller, "wheel", getScroll.wheelHandler);
            return getTween;
        };
        var ScrollTrigger_ScrollTrigger = function() {
            function ScrollTrigger(vars, animation) {
                ScrollTrigger_coreInitted || ScrollTrigger.register(ScrollTrigger_gsap) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
                this.init(vars, animation);
            }
            var _proto = ScrollTrigger.prototype;
            _proto.init = function init(vars, animation) {
                this.progress = this.start = 0;
                this.vars && this.kill(true, true);
                if (!_enabled) {
                    this.update = this.refresh = this.kill = ScrollTrigger_passThrough;
                    return;
                }
                vars = ScrollTrigger_setDefaults(ScrollTrigger_isString(vars) || ScrollTrigger_isNumber(vars) || vars.nodeType ? {
                    trigger: vars
                } : vars, ScrollTrigger_defaults);
                var tweenTo, pinCache, snapFunc, scroll1, scroll2, start, end, markerStart, markerEnd, markerStartTrigger, markerEndTrigger, markerVars, change, pinOriginalState, pinActiveState, pinState, spacer, offset, pinGetter, pinSetter, pinStart, pinChange, spacingStart, spacerState, markerStartSetter, pinMoves, markerEndSetter, cs, snap1, snap2, scrubTween, scrubSmooth, snapDurClamp, snapDelayedCall, prevProgress, prevScroll, prevAnimProgress, caMarkerSetter, customRevertReturn, _vars = vars, onUpdate = _vars.onUpdate, toggleClass = _vars.toggleClass, id = _vars.id, onToggle = _vars.onToggle, onRefresh = _vars.onRefresh, scrub = _vars.scrub, trigger = _vars.trigger, pin = _vars.pin, pinSpacing = _vars.pinSpacing, invalidateOnRefresh = _vars.invalidateOnRefresh, anticipatePin = _vars.anticipatePin, onScrubComplete = _vars.onScrubComplete, onSnapComplete = _vars.onSnapComplete, once = _vars.once, snap = _vars.snap, pinReparent = _vars.pinReparent, pinSpacer = _vars.pinSpacer, containerAnimation = _vars.containerAnimation, fastScrollEnd = _vars.fastScrollEnd, preventOverlaps = _vars.preventOverlaps, direction = vars.horizontal || vars.containerAnimation && false !== vars.horizontal ? _horizontal : _vertical, isToggle = !scrub && 0 !== scrub, scroller = _getTarget(vars.scroller || ScrollTrigger_win), scrollerCache = ScrollTrigger_gsap.core.getCache(scroller), isViewport = ScrollTrigger_isViewport(scroller), useFixedPosition = "fixed" === ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed"), callbacks = [ vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack ], toggleActions = isToggle && vars.toggleActions.split(" "), markers = "markers" in vars ? vars.markers : ScrollTrigger_defaults.markers, borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, self = this, onRefreshInit = vars.onRefreshInit && function() {
                    return vars.onRefreshInit(self);
                }, getScrollerSize = _getSizeFunc(scroller, isViewport, direction), getScrollerOffsets = _getOffsetsFunc(scroller, isViewport), lastSnap = 0, lastRefresh = 0, scrollFunc = _getScrollFunc(scroller, direction);
                ScrollTrigger_context(self);
                self._dir = direction;
                anticipatePin *= 45;
                self.scroller = scroller;
                self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
                scroll1 = scrollFunc();
                self.vars = vars;
                animation = animation || vars.animation;
                if ("refreshPriority" in vars) {
                    _sort = 1;
                    -9999 === vars.refreshPriority && (_primary = self);
                }
                scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
                    top: _getTweenCreator(scroller, _vertical),
                    left: _getTweenCreator(scroller, _horizontal)
                };
                self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
                self.scrubDuration = function(value) {
                    scrubSmooth = ScrollTrigger_isNumber(value) && value;
                    if (!scrubSmooth) {
                        scrubTween && scrubTween.progress(1).kill();
                        scrubTween = 0;
                    } else scrubTween ? scrubTween.duration(value) : scrubTween = ScrollTrigger_gsap.to(animation, {
                        ease: "expo",
                        totalProgress: "+=0.001",
                        duration: scrubSmooth,
                        paused: true,
                        onComplete: function onComplete() {
                            return onScrubComplete && onScrubComplete(self);
                        }
                    });
                };
                if (animation) {
                    animation.vars.lazy = false;
                    animation._initted || false !== animation.vars.immediateRender && false !== vars.immediateRender && animation.duration() && animation.render(0, true, true);
                    self.animation = animation.pause();
                    animation.scrollTrigger = self;
                    self.scrubDuration(scrub);
                    snap1 = 0;
                    id || (id = animation.vars.id);
                }
                _triggers.push(self);
                if (snap) {
                    if (!ScrollTrigger_isObject(snap) || snap.push) snap = {
                        snapTo: snap
                    };
                    "scrollBehavior" in ScrollTrigger_body.style && ScrollTrigger_gsap.set(isViewport ? [ ScrollTrigger_body, ScrollTrigger_docEl ] : scroller, {
                        scrollBehavior: "auto"
                    });
                    _scrollers.forEach((function(o) {
                        return ScrollTrigger_isFunction(o) && o.target === (isViewport ? ScrollTrigger_doc.scrollingElement || ScrollTrigger_docEl : scroller) && (o.smooth = false);
                    }));
                    snapFunc = ScrollTrigger_isFunction(snap.snapTo) ? snap.snapTo : "labels" === snap.snapTo ? _getClosestLabel(animation) : "labelsDirectional" === snap.snapTo ? _getLabelAtDirection(animation) : false !== snap.directional ? function(value, st) {
                        return _snapDirectional(snap.snapTo)(value, ScrollTrigger_getTime() - lastRefresh < 500 ? 0 : st.direction);
                    } : ScrollTrigger_gsap.utils.snap(snap.snapTo);
                    snapDurClamp = snap.duration || {
                        min: .1,
                        max: 2
                    };
                    snapDurClamp = ScrollTrigger_isObject(snapDurClamp) ? ScrollTrigger_clamp(snapDurClamp.min, snapDurClamp.max) : ScrollTrigger_clamp(snapDurClamp, snapDurClamp);
                    snapDelayedCall = ScrollTrigger_gsap.delayedCall(snap.delay || scrubSmooth / 2 || .1, (function() {
                        var scroll = scrollFunc(), refreshedRecently = ScrollTrigger_getTime() - lastRefresh < 500, tween = tweenTo.tween;
                        if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
                            var progress = (scroll - start) / change, totalProgress = animation && !isToggle ? animation.totalProgress() : progress, velocity = refreshedRecently ? 0 : (totalProgress - snap2) / (ScrollTrigger_getTime() - _time2) * 1e3 || 0, change1 = ScrollTrigger_gsap.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / .185), naturalEnd = progress + (false === snap.inertia ? 0 : change1), endValue = ScrollTrigger_clamp(0, 1, snapFunc(naturalEnd, self)), endScroll = Math.round(start + endValue * change), _snap = snap, onStart = _snap.onStart, _onInterrupt = _snap.onInterrupt, _onComplete = _snap.onComplete;
                            if (scroll <= end && scroll >= start && endScroll !== scroll) {
                                if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) return;
                                if (false === snap.inertia) change1 = endValue - progress;
                                tweenTo(endScroll, {
                                    duration: snapDurClamp(_abs(.185 * Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) / velocity / .05 || 0)),
                                    ease: snap.ease || "power3",
                                    data: _abs(endScroll - scroll),
                                    onInterrupt: function onInterrupt() {
                                        return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
                                    },
                                    onComplete: function onComplete() {
                                        self.update();
                                        lastSnap = scrollFunc();
                                        snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
                                        onSnapComplete && onSnapComplete(self);
                                        _onComplete && _onComplete(self);
                                    }
                                }, scroll, change1 * change, endScroll - scroll - change1 * change);
                                onStart && onStart(self, tweenTo.tween);
                            }
                        } else if (self.isActive && lastSnap !== scroll) snapDelayedCall.restart(true);
                    })).pause();
                }
                id && (_ids[id] = self);
                trigger = self.trigger = _getTarget(trigger || pin);
                customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
                customRevertReturn && (customRevertReturn = customRevertReturn(self));
                pin = true === pin ? trigger : _getTarget(pin);
                ScrollTrigger_isString(toggleClass) && (toggleClass = {
                    targets: trigger,
                    className: toggleClass
                });
                if (pin) {
                    false === pinSpacing || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && "flex" === _getComputedStyle(pin.parentNode).display ? false : _padding);
                    self.pin = pin;
                    pinCache = ScrollTrigger_gsap.core.getCache(pin);
                    if (!pinCache.spacer) {
                        if (pinSpacer) {
                            pinSpacer = _getTarget(pinSpacer);
                            pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
                            pinCache.spacerIsNative = !!pinSpacer;
                            pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
                        }
                        pinCache.spacer = spacer = pinSpacer || ScrollTrigger_doc.createElement("div");
                        spacer.classList.add("pin-spacer");
                        id && spacer.classList.add("pin-spacer-" + id);
                        pinCache.pinState = pinOriginalState = _getState(pin);
                    } else pinOriginalState = pinCache.pinState;
                    false !== vars.force3D && ScrollTrigger_gsap.set(pin, {
                        force3D: true
                    });
                    self.spacer = spacer = pinCache.spacer;
                    cs = _getComputedStyle(pin);
                    spacingStart = cs[pinSpacing + direction.os2];
                    pinGetter = ScrollTrigger_gsap.getProperty(pin);
                    pinSetter = ScrollTrigger_gsap.quickSetter(pin, direction.a, _px);
                    _swapPinIn(pin, spacer, cs);
                    pinState = _getState(pin);
                }
                if (markers) {
                    markerVars = ScrollTrigger_isObject(markers) ? ScrollTrigger_setDefaults(markers, _markerDefaults) : _markerDefaults;
                    markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
                    markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
                    offset = markerStartTrigger["offset" + direction.op.d2];
                    var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
                    markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
                    markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
                    containerAnimation && (caMarkerSetter = ScrollTrigger_gsap.quickSetter([ markerStart, markerEnd ], direction.a, _px));
                    if (!useFixedPosition && !(_proxies.length && true === _getProxyProp(scroller, "fixedMarkers"))) {
                        _makePositionable(isViewport ? ScrollTrigger_body : scroller);
                        ScrollTrigger_gsap.set([ markerStartTrigger, markerEndTrigger ], {
                            force3D: true
                        });
                        markerStartSetter = ScrollTrigger_gsap.quickSetter(markerStartTrigger, direction.a, _px);
                        markerEndSetter = ScrollTrigger_gsap.quickSetter(markerEndTrigger, direction.a, _px);
                    }
                }
                if (containerAnimation) {
                    var oldOnUpdate = containerAnimation.vars.onUpdate, oldParams = containerAnimation.vars.onUpdateParams;
                    containerAnimation.eventCallback("onUpdate", (function() {
                        self.update(0, 0, 1);
                        oldOnUpdate && oldOnUpdate.apply(oldParams || []);
                    }));
                }
                self.previous = function() {
                    return _triggers[_triggers.indexOf(self) - 1];
                };
                self.next = function() {
                    return _triggers[_triggers.indexOf(self) + 1];
                };
                self.revert = function(revert, temp) {
                    if (!temp) return self.kill(true);
                    var r = false !== revert || !self.enabled, prevRefreshing = _refreshing;
                    if (r !== self.isReverted) {
                        if (r) {
                            prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
                            prevProgress = self.progress;
                            prevAnimProgress = animation && animation.progress();
                        }
                        markerStart && [ markerStart, markerEnd, markerStartTrigger, markerEndTrigger ].forEach((function(m) {
                            return m.style.display = r ? "none" : "block";
                        }));
                        if (r) {
                            _refreshing = 1;
                            self.update(r);
                        }
                        if (pin && (!pinReparent || !self.isActive)) if (r) _swapPinOut(pin, spacer, pinOriginalState); else _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
                        r || self.update(r);
                        _refreshing = prevRefreshing;
                        self.isReverted = r;
                    }
                };
                self.refresh = function(soft, force) {
                    if ((_refreshing || !self.enabled) && !force) return;
                    if (pin && soft && _lastScrollTime) {
                        ScrollTrigger_addListener(ScrollTrigger, "scrollEnd", _softRefresh);
                        return;
                    }
                    !_refreshingAll && onRefreshInit && onRefreshInit(self);
                    _refreshing = 1;
                    lastRefresh = ScrollTrigger_getTime();
                    if (tweenTo.tween) {
                        tweenTo.tween.kill();
                        tweenTo.tween = 0;
                    }
                    scrubTween && scrubTween.pause();
                    invalidateOnRefresh && animation && animation.revert({
                        kill: false
                    }).invalidate();
                    self.isReverted || self.revert(true, true);
                    self._subPinOffset = false;
                    var cs, bounds, scroll, isVertical, override, curTrigger, curPin, oppositeScroll, initted, revertedPins, forcedOverflow, size = getScrollerSize(), scrollerBounds = getScrollerOffsets(), max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction), offset = 0, otherPinOffset = 0, parsedEnd = vars.end, parsedEndTrigger = vars.endTrigger || trigger, parsedStart = vars.start || (0 === vars.start || !trigger ? 0 : pin ? "0 0" : "0 100%"), pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer), triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0, i = triggerIndex;
                    while (i--) {
                        curTrigger = _triggers[i];
                        curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = 1);
                        curPin = curTrigger.pin;
                        if (curPin && (curPin === trigger || curPin === pin) && !curTrigger.isReverted) {
                            revertedPins || (revertedPins = []);
                            revertedPins.unshift(curTrigger);
                            curTrigger.revert(true, true);
                        }
                        if (curTrigger !== _triggers[i]) {
                            triggerIndex--;
                            i--;
                        }
                    }
                    ScrollTrigger_isFunction(parsedStart) && (parsedStart = parsedStart(self));
                    start = ScrollTrigger_parsePosition(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation) || (pin ? -.001 : 0);
                    ScrollTrigger_isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));
                    if (ScrollTrigger_isString(parsedEnd) && !parsedEnd.indexOf("+=")) if (~parsedEnd.indexOf(" ")) parsedEnd = (ScrollTrigger_isString(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd; else {
                        offset = _offsetToPx(parsedEnd.substr(2), size);
                        parsedEnd = ScrollTrigger_isString(parsedStart) ? parsedStart : start + offset;
                        parsedEndTrigger = trigger;
                    }
                    end = Math.max(start, ScrollTrigger_parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation)) || -.001;
                    change = end - start || (start -= .01) && .001;
                    offset = 0;
                    i = triggerIndex;
                    while (i--) {
                        curTrigger = _triggers[i];
                        curPin = curTrigger.pin;
                        if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
                            cs = curTrigger.end - curTrigger.start;
                            if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && !ScrollTrigger_isNumber(parsedStart)) offset += cs * (1 - curTrigger.progress);
                            curPin === pin && (otherPinOffset += cs);
                        }
                    }
                    start += offset;
                    end += offset;
                    self._pinPush = otherPinOffset;
                    if (markerStart && offset) {
                        cs = {};
                        cs[direction.a] = "+=" + offset;
                        pinnedContainer && (cs[direction.p] = "-=" + scrollFunc());
                        ScrollTrigger_gsap.set([ markerStart, markerEnd ], cs);
                    }
                    if (pin) {
                        cs = _getComputedStyle(pin);
                        isVertical = direction === _vertical;
                        scroll = scrollFunc();
                        pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
                        if (!max && end > 1) {
                            forcedOverflow = (isViewport ? ScrollTrigger_doc.scrollingElement || ScrollTrigger_docEl : scroller).style;
                            forcedOverflow = {
                                style: forcedOverflow,
                                value: forcedOverflow["overflow" + direction.a.toUpperCase()]
                            };
                            forcedOverflow["overflow" + direction.a.toUpperCase()] = "scroll";
                        }
                        _swapPinIn(pin, spacer, cs);
                        pinState = _getState(pin);
                        bounds = _getBounds(pin, true);
                        oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
                        if (pinSpacing) {
                            spacerState = [ pinSpacing + direction.os2, change + otherPinOffset + _px ];
                            spacerState.t = spacer;
                            i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
                            i && spacerState.push(direction.d, i + _px);
                            _setState(spacerState);
                            if (pinnedContainer) _triggers.forEach((function(t) {
                                if (t.pin === pinnedContainer && false !== t.vars.pinSpacing) t._subPinOffset = true;
                            }));
                            useFixedPosition && scrollFunc(prevScroll);
                        }
                        if (useFixedPosition) {
                            override = {
                                top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
                                left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
                                boxSizing: "border-box",
                                position: "fixed"
                            };
                            override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
                            override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
                            override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
                            override[_padding] = cs[_padding];
                            override[_padding + _Top] = cs[_padding + _Top];
                            override[_padding + _Right] = cs[_padding + _Right];
                            override[_padding + _Bottom] = cs[_padding + _Bottom];
                            override[_padding + _Left] = cs[_padding + _Left];
                            pinActiveState = _copyState(pinOriginalState, override, pinReparent);
                            _refreshingAll && scrollFunc(0);
                        }
                        if (animation) {
                            initted = animation._initted;
                            ScrollTrigger_suppressOverwrites(1);
                            animation.render(animation.duration(), true, true);
                            pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
                            pinMoves = Math.abs(change - pinChange) > 1;
                            useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2);
                            animation.render(0, true, true);
                            initted || animation.invalidate(true);
                            animation.parent || animation.totalTime(animation.totalTime());
                            ScrollTrigger_suppressOverwrites(0);
                        } else pinChange = change;
                        forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
                    } else if (trigger && scrollFunc() && !containerAnimation) {
                        bounds = trigger.parentNode;
                        while (bounds && bounds !== ScrollTrigger_body) {
                            if (bounds._pinOffset) {
                                start -= bounds._pinOffset;
                                end -= bounds._pinOffset;
                            }
                            bounds = bounds.parentNode;
                        }
                    }
                    revertedPins && revertedPins.forEach((function(t) {
                        return t.revert(false, true);
                    }));
                    self.start = start;
                    self.end = end;
                    scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
                    if (!containerAnimation && !_refreshingAll) {
                        scroll1 < prevScroll && scrollFunc(prevScroll);
                        self.scroll.rec = 0;
                    }
                    self.revert(false, true);
                    if (snapDelayedCall) {
                        lastSnap = -1;
                        self.isActive && scrollFunc(start + change * prevProgress);
                        snapDelayedCall.restart(true);
                    }
                    _refreshing = 0;
                    animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress, true).render(animation.time(), true, true);
                    if (prevProgress !== self.progress || containerAnimation) {
                        animation && !isToggle && animation.totalProgress(prevProgress, true);
                        self.progress = (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
                    }
                    pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
                    onRefresh && !_refreshingAll && onRefresh(self);
                };
                self.getVelocity = function() {
                    return (scrollFunc() - scroll2) / (ScrollTrigger_getTime() - _time2) * 1e3 || 0;
                };
                self.endAnimation = function() {
                    _endAnimation(self.callbackAnimation);
                    if (animation) scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
                };
                self.labelToScroll = function(label) {
                    return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
                };
                self.getTrailing = function(name) {
                    var i = _triggers.indexOf(self), a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);
                    return (ScrollTrigger_isString(name) ? a.filter((function(t) {
                        return t.vars.preventOverlaps === name;
                    })) : a).filter((function(t) {
                        return self.direction > 0 ? t.end <= start : t.start >= end;
                    }));
                };
                self.update = function(reset, recordVelocity, forceFake) {
                    if (containerAnimation && !forceFake && !reset) return;
                    var isActive, wasActive, toggleState, action, stateChanged, toggled, isAtMax, isTakingAction, scroll = _refreshingAll ? prevScroll : self.scroll(), p = reset ? 0 : (scroll - start) / change, clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0, prevProgress = self.progress;
                    if (recordVelocity) {
                        scroll2 = scroll1;
                        scroll1 = containerAnimation ? scrollFunc() : scroll;
                        if (snap) {
                            snap2 = snap1;
                            snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
                        }
                    }
                    anticipatePin && !clipped && pin && !_refreshing && !ScrollTrigger_startup && _lastScrollTime && start < scroll + (scroll - scroll2) / (ScrollTrigger_getTime() - _time2) * anticipatePin && (clipped = 1e-4);
                    if (clipped !== prevProgress && self.enabled) {
                        isActive = self.isActive = !!clipped && clipped < 1;
                        wasActive = !!prevProgress && prevProgress < 1;
                        toggled = isActive !== wasActive;
                        stateChanged = toggled || !!clipped !== !!prevProgress;
                        self.direction = clipped > prevProgress ? 1 : -1;
                        self.progress = clipped;
                        if (stateChanged && !_refreshing) {
                            toggleState = clipped && !prevProgress ? 0 : 1 === clipped ? 1 : 1 === prevProgress ? 2 : 3;
                            if (isToggle) {
                                action = !toggled && "none" !== toggleActions[toggleState + 1] && toggleActions[toggleState + 1] || toggleActions[toggleState];
                                isTakingAction = animation && ("complete" === action || "reset" === action || action in animation);
                            }
                        }
                        preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (ScrollTrigger_isFunction(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach((function(t) {
                            return t.endAnimation();
                        })));
                        if (!isToggle) if (scrubTween && !_refreshing && !ScrollTrigger_startup) {
                            scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start);
                            if (scrubTween.resetTo) scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur); else {
                                scrubTween.vars.totalProgress = clipped;
                                scrubTween.invalidate().restart();
                            }
                        } else if (animation) animation.totalProgress(clipped, !!_refreshing);
                        if (pin) {
                            reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
                            if (!useFixedPosition) pinSetter(ScrollTrigger_round(pinStart + pinChange * clipped)); else if (stateChanged) {
                                isAtMax = !reset && clipped > prevProgress && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
                                if (pinReparent) if (!reset && (isActive || isAtMax)) {
                                    var bounds = _getBounds(pin, true), _offset = scroll - start;
                                    _reparent(pin, ScrollTrigger_body, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
                                } else _reparent(pin, spacer);
                                _setState(isActive || isAtMax ? pinActiveState : pinState);
                                pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (1 === clipped && !isAtMax ? pinChange : 0));
                            }
                        }
                        snap && !tweenTo.tween && !_refreshing && !ScrollTrigger_startup && snapDelayedCall.restart(true);
                        toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach((function(el) {
                            return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
                        }));
                        onUpdate && !isToggle && !reset && onUpdate(self);
                        if (stateChanged && !_refreshing) {
                            if (isToggle) {
                                if (isTakingAction) if ("complete" === action) animation.pause().totalProgress(1); else if ("reset" === action) animation.restart(true).pause(); else if ("restart" === action) animation.restart(true); else animation[action]();
                                onUpdate && onUpdate(self);
                            }
                            if (toggled || !_limitCallbacks) {
                                onToggle && toggled && ScrollTrigger_callback(self, onToggle);
                                callbacks[toggleState] && ScrollTrigger_callback(self, callbacks[toggleState]);
                                once && (1 === clipped ? self.kill(false, 1) : callbacks[toggleState] = 0);
                                if (!toggled) {
                                    toggleState = 1 === clipped ? 1 : 3;
                                    callbacks[toggleState] && ScrollTrigger_callback(self, callbacks[toggleState]);
                                }
                            }
                            if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (ScrollTrigger_isNumber(fastScrollEnd) ? fastScrollEnd : 2500)) {
                                _endAnimation(self.callbackAnimation);
                                scrubTween ? scrubTween.progress(1) : _endAnimation(animation, "reverse" === action ? 1 : !clipped, 1);
                            }
                        } else if (isToggle && onUpdate && !_refreshing) onUpdate(self);
                    }
                    if (markerEndSetter) {
                        var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
                        markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
                        markerEndSetter(n);
                    }
                    caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
                };
                self.enable = function(reset, refresh) {
                    if (!self.enabled) {
                        self.enabled = true;
                        ScrollTrigger_addListener(scroller, "resize", _onResize);
                        ScrollTrigger_addListener(isViewport ? ScrollTrigger_doc : scroller, "scroll", ScrollTrigger_onScroll);
                        onRefreshInit && ScrollTrigger_addListener(ScrollTrigger, "refreshInit", onRefreshInit);
                        if (false !== reset) {
                            self.progress = prevProgress = 0;
                            scroll1 = scroll2 = lastSnap = scrollFunc();
                        }
                        false !== refresh && self.refresh();
                    }
                };
                self.getTween = function(snap) {
                    return snap && tweenTo ? tweenTo.tween : scrubTween;
                };
                self.setPositions = function(newStart, newEnd) {
                    if (pin) {
                        pinStart += newStart - start;
                        pinChange += newEnd - newStart - change;
                        pinSpacing === _padding && self.adjustPinSpacing(newEnd - newStart - change);
                    }
                    self.start = start = newStart;
                    self.end = end = newEnd;
                    change = newEnd - newStart;
                    self.update();
                };
                self.adjustPinSpacing = function(amount) {
                    if (spacerState) {
                        var i = spacerState.indexOf(direction.d) + 1;
                        spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
                        spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
                        _setState(spacerState);
                    }
                };
                self.disable = function(reset, allowAnimation) {
                    if (self.enabled) {
                        false !== reset && self.revert(true, true);
                        self.enabled = self.isActive = false;
                        allowAnimation || scrubTween && scrubTween.pause();
                        prevScroll = 0;
                        pinCache && (pinCache.uncache = 1);
                        onRefreshInit && ScrollTrigger_removeListener(ScrollTrigger, "refreshInit", onRefreshInit);
                        if (snapDelayedCall) {
                            snapDelayedCall.pause();
                            tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
                        }
                        if (!isViewport) {
                            var i = _triggers.length;
                            while (i--) if (_triggers[i].scroller === scroller && _triggers[i] !== self) return;
                            ScrollTrigger_removeListener(scroller, "resize", _onResize);
                            ScrollTrigger_removeListener(scroller, "scroll", ScrollTrigger_onScroll);
                        }
                    }
                };
                self.kill = function(revert, allowAnimation) {
                    self.disable(revert, allowAnimation);
                    scrubTween && !allowAnimation && scrubTween.kill();
                    id && delete _ids[id];
                    var i = _triggers.indexOf(self);
                    i >= 0 && _triggers.splice(i, 1);
                    i === _i && _direction > 0 && _i--;
                    i = 0;
                    _triggers.forEach((function(t) {
                        return t.scroller === self.scroller && (i = 1);
                    }));
                    i || _refreshingAll || (self.scroll.rec = 0);
                    if (animation) {
                        animation.scrollTrigger = null;
                        revert && animation.revert({
                            kill: false
                        });
                        allowAnimation || animation.kill();
                    }
                    markerStart && [ markerStart, markerEnd, markerStartTrigger, markerEndTrigger ].forEach((function(m) {
                        return m.parentNode && m.parentNode.removeChild(m);
                    }));
                    _primary === self && (_primary = 0);
                    if (pin) {
                        pinCache && (pinCache.uncache = 1);
                        i = 0;
                        _triggers.forEach((function(t) {
                            return t.pin === pin && i++;
                        }));
                        i || (pinCache.spacer = 0);
                    }
                    vars.onKill && vars.onKill(self);
                };
                self.enable(false, false);
                customRevertReturn && customRevertReturn(self);
                !animation || !animation.add || change ? self.refresh() : ScrollTrigger_gsap.delayedCall(.01, (function() {
                    return start || end || self.refresh();
                })) && (change = .01) && (start = end = 0);
                pin && _queueRefreshAll();
            };
            ScrollTrigger.register = function register(core) {
                if (!ScrollTrigger_coreInitted) {
                    ScrollTrigger_gsap = core || ScrollTrigger_getGSAP();
                    ScrollTrigger_windowExists() && window.document && ScrollTrigger.enable();
                    ScrollTrigger_coreInitted = _enabled;
                }
                return ScrollTrigger_coreInitted;
            };
            ScrollTrigger.defaults = function defaults(config) {
                if (config) for (var p in config) ScrollTrigger_defaults[p] = config[p];
                return ScrollTrigger_defaults;
            };
            ScrollTrigger.disable = function disable(reset, kill) {
                _enabled = 0;
                _triggers.forEach((function(trigger) {
                    return trigger[kill ? "kill" : "disable"](reset);
                }));
                ScrollTrigger_removeListener(ScrollTrigger_win, "wheel", ScrollTrigger_onScroll);
                ScrollTrigger_removeListener(ScrollTrigger_doc, "scroll", ScrollTrigger_onScroll);
                clearInterval(_syncInterval);
                ScrollTrigger_removeListener(ScrollTrigger_doc, "touchcancel", ScrollTrigger_passThrough);
                ScrollTrigger_removeListener(ScrollTrigger_body, "touchstart", ScrollTrigger_passThrough);
                _multiListener(ScrollTrigger_removeListener, ScrollTrigger_doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);
                _multiListener(ScrollTrigger_removeListener, ScrollTrigger_doc, "pointerup,touchend,mouseup", _pointerUpHandler);
                _resizeDelay.kill();
                _iterateAutoRefresh(ScrollTrigger_removeListener);
                for (var i = 0; i < _scrollers.length; i += 3) {
                    _wheelListener(ScrollTrigger_removeListener, _scrollers[i], _scrollers[i + 1]);
                    _wheelListener(ScrollTrigger_removeListener, _scrollers[i], _scrollers[i + 2]);
                }
            };
            ScrollTrigger.enable = function enable() {
                ScrollTrigger_win = window;
                ScrollTrigger_doc = document;
                ScrollTrigger_docEl = ScrollTrigger_doc.documentElement;
                ScrollTrigger_body = ScrollTrigger_doc.body;
                if (ScrollTrigger_gsap) {
                    _toArray = ScrollTrigger_gsap.utils.toArray;
                    ScrollTrigger_clamp = ScrollTrigger_gsap.utils.clamp;
                    ScrollTrigger_context = ScrollTrigger_gsap.core.context || ScrollTrigger_passThrough;
                    ScrollTrigger_suppressOverwrites = ScrollTrigger_gsap.core.suppressOverwrites || ScrollTrigger_passThrough;
                    _scrollRestoration = ScrollTrigger_win.history.scrollRestoration || "auto";
                    ScrollTrigger_gsap.core.globals("ScrollTrigger", ScrollTrigger);
                    if (ScrollTrigger_body) {
                        _enabled = 1;
                        Observer_Observer.register(ScrollTrigger_gsap);
                        ScrollTrigger.isTouch = Observer_Observer.isTouch;
                        _fixIOSBug = Observer_Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
                        ScrollTrigger_addListener(ScrollTrigger_win, "wheel", ScrollTrigger_onScroll);
                        ScrollTrigger_root = [ ScrollTrigger_win, ScrollTrigger_doc, ScrollTrigger_docEl, ScrollTrigger_body ];
                        if (ScrollTrigger_gsap.matchMedia) {
                            ScrollTrigger.matchMedia = function(vars) {
                                var p, mm = ScrollTrigger_gsap.matchMedia();
                                for (p in vars) mm.add(p, vars[p]);
                                return mm;
                            };
                            ScrollTrigger_gsap.addEventListener("matchMediaInit", (function() {
                                return _revertAll();
                            }));
                            ScrollTrigger_gsap.addEventListener("matchMediaRevert", (function() {
                                return _revertRecorded();
                            }));
                            ScrollTrigger_gsap.addEventListener("matchMedia", (function() {
                                _refreshAll(0, 1);
                                ScrollTrigger_dispatch("matchMedia");
                            }));
                            ScrollTrigger_gsap.matchMedia("(orientation: portrait)", (function() {
                                _setBaseDimensions();
                                return _setBaseDimensions;
                            }));
                        } else console.warn("Requires GSAP 3.11.0 or later");
                        _setBaseDimensions();
                        ScrollTrigger_addListener(ScrollTrigger_doc, "scroll", ScrollTrigger_onScroll);
                        var bounds, i, bodyStyle = ScrollTrigger_body.style, border = bodyStyle.borderTopStyle, AnimationProto = ScrollTrigger_gsap.core.Animation.prototype;
                        AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
                            value: function value() {
                                return this.time(-.01, true);
                            }
                        });
                        bodyStyle.borderTopStyle = "solid";
                        bounds = _getBounds(ScrollTrigger_body);
                        _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
                        _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
                        border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
                        _syncInterval = setInterval(_sync, 250);
                        ScrollTrigger_gsap.delayedCall(.5, (function() {
                            return ScrollTrigger_startup = 0;
                        }));
                        ScrollTrigger_addListener(ScrollTrigger_doc, "touchcancel", ScrollTrigger_passThrough);
                        ScrollTrigger_addListener(ScrollTrigger_body, "touchstart", ScrollTrigger_passThrough);
                        _multiListener(ScrollTrigger_addListener, ScrollTrigger_doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);
                        _multiListener(ScrollTrigger_addListener, ScrollTrigger_doc, "pointerup,touchend,mouseup", _pointerUpHandler);
                        ScrollTrigger_transformProp = ScrollTrigger_gsap.utils.checkPrefix("transform");
                        _stateProps.push(ScrollTrigger_transformProp);
                        ScrollTrigger_coreInitted = ScrollTrigger_getTime();
                        _resizeDelay = ScrollTrigger_gsap.delayedCall(.2, _refreshAll).pause();
                        _autoRefresh = [ ScrollTrigger_doc, "visibilitychange", function() {
                            var w = ScrollTrigger_win.innerWidth, h = ScrollTrigger_win.innerHeight;
                            if (ScrollTrigger_doc.hidden) {
                                _prevWidth = w;
                                _prevHeight = h;
                            } else if (_prevWidth !== w || _prevHeight !== h) _onResize();
                        }, ScrollTrigger_doc, "DOMContentLoaded", _refreshAll, ScrollTrigger_win, "load", _refreshAll, ScrollTrigger_win, "resize", _onResize ];
                        _iterateAutoRefresh(ScrollTrigger_addListener);
                        _triggers.forEach((function(trigger) {
                            return trigger.enable(0, 1);
                        }));
                        for (i = 0; i < _scrollers.length; i += 3) {
                            _wheelListener(ScrollTrigger_removeListener, _scrollers[i], _scrollers[i + 1]);
                            _wheelListener(ScrollTrigger_removeListener, _scrollers[i], _scrollers[i + 2]);
                        }
                    }
                }
            };
            ScrollTrigger.config = function config(vars) {
                "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
                var ms = vars.syncInterval;
                ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
                "ignoreMobileResize" in vars && (_ignoreMobileResize = 1 === ScrollTrigger.isTouch && vars.ignoreMobileResize);
                if ("autoRefreshEvents" in vars) {
                    _iterateAutoRefresh(ScrollTrigger_removeListener) || _iterateAutoRefresh(ScrollTrigger_addListener, vars.autoRefreshEvents || "none");
                    _ignoreResize = -1 === (vars.autoRefreshEvents + "").indexOf("resize");
                }
            };
            ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
                var t = _getTarget(target), i = _scrollers.indexOf(t), isViewport = ScrollTrigger_isViewport(t);
                if (~i) _scrollers.splice(i, isViewport ? 6 : 2);
                if (vars) isViewport ? _proxies.unshift(ScrollTrigger_win, vars, ScrollTrigger_body, vars, ScrollTrigger_docEl, vars) : _proxies.unshift(t, vars);
            };
            ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
                _triggers.forEach((function(t) {
                    return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
                }));
            };
            ScrollTrigger.isInViewport = function isInViewport(element, ratio, horizontal) {
                var bounds = (ScrollTrigger_isString(element) ? _getTarget(element) : element).getBoundingClientRect(), offset = bounds[horizontal ? _width : _height] * ratio || 0;
                return horizontal ? bounds.right - offset > 0 && bounds.left + offset < ScrollTrigger_win.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < ScrollTrigger_win.innerHeight;
            };
            ScrollTrigger.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
                ScrollTrigger_isString(element) && (element = _getTarget(element));
                var bounds = element.getBoundingClientRect(), size = bounds[horizontal ? _width : _height], offset = null == referencePoint ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
                return horizontal ? (bounds.left + offset) / ScrollTrigger_win.innerWidth : (bounds.top + offset) / ScrollTrigger_win.innerHeight;
            };
            ScrollTrigger.killAll = function killAll(allowListeners) {
                _triggers.slice(0).forEach((function(t) {
                    return "ScrollSmoother" !== t.vars.id && t.kill();
                }));
                if (true !== allowListeners) {
                    var listeners = ScrollTrigger_listeners.killAll || [];
                    ScrollTrigger_listeners = {};
                    listeners.forEach((function(f) {
                        return f();
                    }));
                }
            };
            return ScrollTrigger;
        }();
        ScrollTrigger_ScrollTrigger.version = "3.11.4";
        ScrollTrigger_ScrollTrigger.saveStyles = function(targets) {
            return targets ? _toArray(targets).forEach((function(target) {
                if (target && target.style) {
                    var i = _savedStyles.indexOf(target);
                    i >= 0 && _savedStyles.splice(i, 5);
                    _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), ScrollTrigger_gsap.core.getCache(target), ScrollTrigger_context());
                }
            })) : _savedStyles;
        };
        ScrollTrigger_ScrollTrigger.revert = function(soft, media) {
            return _revertAll(!soft, media);
        };
        ScrollTrigger_ScrollTrigger.create = function(vars, animation) {
            return new ScrollTrigger_ScrollTrigger(vars, animation);
        };
        ScrollTrigger_ScrollTrigger.refresh = function(safe) {
            return safe ? _onResize() : (ScrollTrigger_coreInitted || ScrollTrigger_ScrollTrigger.register()) && _refreshAll(true);
        };
        ScrollTrigger_ScrollTrigger.update = function(force) {
            return ++_scrollers.cache && _updateAll(true === force ? 2 : 0);
        };
        ScrollTrigger_ScrollTrigger.clearScrollMemory = _clearScrollMemory;
        ScrollTrigger_ScrollTrigger.maxScroll = function(element, horizontal) {
            return _maxScroll(element, horizontal ? _horizontal : _vertical);
        };
        ScrollTrigger_ScrollTrigger.getScrollFunc = function(element, horizontal) {
            return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
        };
        ScrollTrigger_ScrollTrigger.getById = function(id) {
            return _ids[id];
        };
        ScrollTrigger_ScrollTrigger.getAll = function() {
            return _triggers.filter((function(t) {
                return "ScrollSmoother" !== t.vars.id;
            }));
        };
        ScrollTrigger_ScrollTrigger.isScrolling = function() {
            return !!_lastScrollTime;
        };
        ScrollTrigger_ScrollTrigger.snapDirectional = _snapDirectional;
        ScrollTrigger_ScrollTrigger.addEventListener = function(type, callback) {
            var a = ScrollTrigger_listeners[type] || (ScrollTrigger_listeners[type] = []);
            ~a.indexOf(callback) || a.push(callback);
        };
        ScrollTrigger_ScrollTrigger.removeEventListener = function(type, callback) {
            var a = ScrollTrigger_listeners[type], i = a && a.indexOf(callback);
            i >= 0 && a.splice(i, 1);
        };
        ScrollTrigger_ScrollTrigger.batch = function(targets, vars) {
            var p, result = [], varsCopy = {}, interval = vars.interval || .016, batchMax = vars.batchMax || 1e9, proxyCallback = function proxyCallback(type, callback) {
                var elements = [], triggers = [], delay = ScrollTrigger_gsap.delayedCall(interval, (function() {
                    callback(elements, triggers);
                    elements = [];
                    triggers = [];
                })).pause();
                return function(self) {
                    elements.length || delay.restart(true);
                    elements.push(self.trigger);
                    triggers.push(self);
                    batchMax <= elements.length && delay.progress(1);
                };
            };
            for (p in vars) varsCopy[p] = "on" === p.substr(0, 2) && ScrollTrigger_isFunction(vars[p]) && "onRefreshInit" !== p ? proxyCallback(p, vars[p]) : vars[p];
            if (ScrollTrigger_isFunction(batchMax)) {
                batchMax = batchMax();
                ScrollTrigger_addListener(ScrollTrigger_ScrollTrigger, "refresh", (function() {
                    return batchMax = vars.batchMax();
                }));
            }
            _toArray(targets).forEach((function(target) {
                var config = {};
                for (p in varsCopy) config[p] = varsCopy[p];
                config.trigger = target;
                result.push(ScrollTrigger_ScrollTrigger.create(config));
            }));
            return result;
        };
        var _inputIsFocused, _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier(scrollFunc, current, end, max) {
            current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
            return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
        }, _allowNativePanning = function _allowNativePanning(target, direction) {
            if (true === direction) target.style.removeProperty("touch-action"); else target.style.touchAction = true === direction ? "auto" : direction ? "pan-" + direction + (Observer_Observer.isTouch ? " pinch-zoom" : "") : "none";
            target === ScrollTrigger_docEl && _allowNativePanning(ScrollTrigger_body, direction);
        }, _overflow = {
            auto: 1,
            scroll: 1
        }, _nestedScroll = function _nestedScroll(_ref5) {
            var event = _ref5.event, target = _ref5.target, axis = _ref5.axis;
            var cs, node = (event.changedTouches ? event.changedTouches[0] : event).target, cache = node._gsap || ScrollTrigger_gsap.core.getCache(node), time = ScrollTrigger_getTime();
            if (!cache._isScrollT || time - cache._isScrollT > 2e3) {
                while (node && node !== ScrollTrigger_body && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) node = node.parentNode;
                cache._isScroll = node && node !== target && !ScrollTrigger_isViewport(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
                cache._isScrollT = time;
            }
            if (cache._isScroll || "x" === axis) {
                event.stopPropagation();
                event._gsapAllow = true;
            }
        }, _inputObserver = function _inputObserver(target, type, inputs, nested) {
            return Observer_Observer.create({
                target,
                capture: true,
                debounce: false,
                lockAxis: true,
                type,
                onWheel: nested = nested && _nestedScroll,
                onPress: nested,
                onDrag: nested,
                onScroll: nested,
                onEnable: function onEnable() {
                    return inputs && ScrollTrigger_addListener(ScrollTrigger_doc, Observer_Observer.eventTypes[0], _captureInputs, false, true);
                },
                onDisable: function onDisable() {
                    return ScrollTrigger_removeListener(ScrollTrigger_doc, Observer_Observer.eventTypes[0], _captureInputs, true);
                }
            });
        }, _inputExp = /(input|label|select|textarea)/i, _captureInputs = function _captureInputs(e) {
            var isInput = _inputExp.test(e.target.tagName);
            if (isInput || _inputIsFocused) {
                e._gsapAllow = true;
                _inputIsFocused = isInput;
            }
        }, _getScrollNormalizer = function _getScrollNormalizer(vars) {
            ScrollTrigger_isObject(vars) || (vars = {});
            vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
            vars.type || (vars.type = "wheel,touch");
            vars.debounce = !!vars.debounce;
            vars.id = vars.id || "normalizer";
            var self, maxY, lastRefreshID, skipTouchMove, tween, startScrollX, startScrollY, onStopDelayedCall, _vars2 = vars, normalizeScrollX = _vars2.normalizeScrollX, momentum = _vars2.momentum, allowNestedScroll = _vars2.allowNestedScroll, target = _getTarget(vars.target) || ScrollTrigger_docEl, smoother = ScrollTrigger_gsap.core.globals().ScrollSmoother, smootherInstance = smoother && smoother.get(), content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && false !== vars.content && !smootherInstance.smooth() && smootherInstance.content()), scrollFuncY = _getScrollFunc(target, _vertical), scrollFuncX = _getScrollFunc(target, _horizontal), scale = 1, initialScale = (Observer_Observer.isTouch && ScrollTrigger_win.visualViewport ? ScrollTrigger_win.visualViewport.scale * ScrollTrigger_win.visualViewport.width : ScrollTrigger_win.outerWidth) / ScrollTrigger_win.innerWidth, wheelRefresh = 0, resolveMomentumDuration = ScrollTrigger_isFunction(momentum) ? function() {
                return momentum(self);
            } : function() {
                return momentum || 2.8;
            }, inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll), resumeTouchMove = function resumeTouchMove() {
                return skipTouchMove = false;
            }, scrollClampX = ScrollTrigger_passThrough, scrollClampY = ScrollTrigger_passThrough, updateClamps = function updateClamps() {
                maxY = _maxScroll(target, _vertical);
                scrollClampY = ScrollTrigger_clamp(_fixIOSBug ? 1 : 0, maxY);
                normalizeScrollX && (scrollClampX = ScrollTrigger_clamp(0, _maxScroll(target, _horizontal)));
                lastRefreshID = _refreshID;
            }, removeContentOffset = function removeContentOffset() {
                content._gsap.y = ScrollTrigger_round(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
                content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
                scrollFuncY.offset = scrollFuncY.cacheID = 0;
            }, ignoreDrag = function ignoreDrag() {
                if (skipTouchMove) {
                    requestAnimationFrame(resumeTouchMove);
                    var offset = ScrollTrigger_round(self.deltaY / 2), scroll = scrollClampY(scrollFuncY.v - offset);
                    if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
                        scrollFuncY.offset = scroll - scrollFuncY.v;
                        var y = ScrollTrigger_round((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
                        content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
                        content._gsap.y = y + "px";
                        scrollFuncY.cacheID = _scrollers.cache;
                        _updateAll();
                    }
                    return true;
                }
                scrollFuncY.offset && removeContentOffset();
                skipTouchMove = true;
            }, onResize = function onResize() {
                updateClamps();
                if (tween.isActive() && tween.vars.scrollY > maxY) scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
            };
            content && ScrollTrigger_gsap.set(content, {
                y: "+=0"
            });
            vars.ignoreCheck = function(e) {
                return _fixIOSBug && "touchmove" === e.type && ignoreDrag(e) || scale > 1.05 && "touchstart" !== e.type || self.isGesturing || e.touches && e.touches.length > 1;
            };
            vars.onPress = function() {
                var prevScale = scale;
                scale = ScrollTrigger_round((ScrollTrigger_win.visualViewport && ScrollTrigger_win.visualViewport.scale || 1) / initialScale);
                tween.pause();
                prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
                startScrollX = scrollFuncX();
                startScrollY = scrollFuncY();
                updateClamps();
                lastRefreshID = _refreshID;
            };
            vars.onRelease = vars.onGestureStart = function(self, wasDragging) {
                scrollFuncY.offset && removeContentOffset();
                if (!wasDragging) onStopDelayedCall.restart(true); else {
                    _scrollers.cache++;
                    var currentScroll, endScroll, dur = resolveMomentumDuration();
                    if (normalizeScrollX) {
                        currentScroll = scrollFuncX();
                        endScroll = currentScroll + .05 * dur * -self.velocityX / .227;
                        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
                        tween.vars.scrollX = scrollClampX(endScroll);
                    }
                    currentScroll = scrollFuncY();
                    endScroll = currentScroll + .05 * dur * -self.velocityY / .227;
                    dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
                    tween.vars.scrollY = scrollClampY(endScroll);
                    tween.invalidate().duration(dur).play(.01);
                    if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) ScrollTrigger_gsap.to({}, {
                        onUpdate: onResize,
                        duration: dur
                    });
                }
            };
            vars.onWheel = function() {
                tween._ts && tween.pause();
                if (ScrollTrigger_getTime() - wheelRefresh > 1e3) {
                    lastRefreshID = 0;
                    wheelRefresh = ScrollTrigger_getTime();
                }
            };
            vars.onChange = function(self, dx, dy, xArray, yArray) {
                _refreshID !== lastRefreshID && updateClamps();
                dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self.startX - self.x) : scrollFuncX() + dx - xArray[1]));
                if (dy) {
                    scrollFuncY.offset && removeContentOffset();
                    var isTouch = yArray[2] === dy, y = isTouch ? startScrollY + self.startY - self.y : scrollFuncY() + dy - yArray[1], yClamped = scrollClampY(y);
                    isTouch && y !== yClamped && (startScrollY += yClamped - y);
                    scrollFuncY(yClamped);
                }
                (dy || dx) && _updateAll();
            };
            vars.onEnable = function() {
                _allowNativePanning(target, normalizeScrollX ? false : "x");
                ScrollTrigger_ScrollTrigger.addEventListener("refresh", onResize);
                ScrollTrigger_addListener(ScrollTrigger_win, "resize", onResize);
                if (scrollFuncY.smooth) {
                    scrollFuncY.target.style.scrollBehavior = "auto";
                    scrollFuncY.smooth = scrollFuncX.smooth = false;
                }
                inputObserver.enable();
            };
            vars.onDisable = function() {
                _allowNativePanning(target, true);
                ScrollTrigger_removeListener(ScrollTrigger_win, "resize", onResize);
                ScrollTrigger_ScrollTrigger.removeEventListener("refresh", onResize);
                inputObserver.kill();
            };
            vars.lockAxis = false !== vars.lockAxis;
            self = new Observer_Observer(vars);
            self.iOS = _fixIOSBug;
            _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
            _fixIOSBug && ScrollTrigger_gsap.ticker.add(ScrollTrigger_passThrough);
            onStopDelayedCall = self._dc;
            tween = ScrollTrigger_gsap.to(self, {
                ease: "power4",
                paused: true,
                scrollX: normalizeScrollX ? "+=0.1" : "+=0",
                scrollY: "+=0.1",
                onComplete: onStopDelayedCall.vars.onComplete
            });
            return self;
        };
        ScrollTrigger_ScrollTrigger.sort = function(func) {
            return _triggers.sort(func || function(a, b) {
                return -1e6 * (a.vars.refreshPriority || 0) + a.start - (b.start + -1e6 * (b.vars.refreshPriority || 0));
            });
        };
        ScrollTrigger_ScrollTrigger.observe = function(vars) {
            return new Observer_Observer(vars);
        };
        ScrollTrigger_ScrollTrigger.normalizeScroll = function(vars) {
            if ("undefined" === typeof vars) return ScrollTrigger_normalizer;
            if (true === vars && ScrollTrigger_normalizer) return ScrollTrigger_normalizer.enable();
            if (false === vars) return ScrollTrigger_normalizer && ScrollTrigger_normalizer.kill();
            var normalizer = vars instanceof Observer_Observer ? vars : _getScrollNormalizer(vars);
            ScrollTrigger_normalizer && ScrollTrigger_normalizer.target === normalizer.target && ScrollTrigger_normalizer.kill();
            ScrollTrigger_isViewport(normalizer.target) && (ScrollTrigger_normalizer = normalizer);
            return normalizer;
        };
        ScrollTrigger_ScrollTrigger.core = {
            _getVelocityProp,
            _inputObserver,
            _scrollers,
            _proxies,
            bridge: {
                ss: function ss() {
                    _lastScrollTime || ScrollTrigger_dispatch("scrollStart");
                    _lastScrollTime = ScrollTrigger_getTime();
                },
                ref: function ref() {
                    return _refreshing;
                }
            }
        };
        ScrollTrigger_getGSAP() && ScrollTrigger_gsap.registerPlugin(ScrollTrigger_ScrollTrigger);
        window.addEventListener("load", (function() {
            gsapWithCSS.registerPlugin(ScrollTrigger_ScrollTrigger);
            if (document.querySelectorAll(".questions__images img").length) gsapWithCSS.to(".questions__images img", {
                scrollTrigger: {
                    trigger: ".questions__images img",
                    start: "top center",
                    scrub: 1.5
                },
                y: "-=80"
            });
            if (document.querySelectorAll(".index-partners__parnters_top .index-partners__item").length) gsapWithCSS.to(".index-partners__parnters_top .index-partners__item", {
                scrollTrigger: {
                    trigger: ".index-partners__item",
                    scrub: 1.5,
                    start: "top bottom"
                },
                x: "200%"
            });
            if (document.querySelectorAll(".index-partners__parnters_bottom .index-partners__item").length) gsapWithCSS.to(".index-partners__parnters_bottom .index-partners__item", {
                scrollTrigger: {
                    trigger: ".index-partners__item",
                    scrub: 1.5,
                    start: "top bottom"
                },
                x: "+=-150"
            });
        }));
        window.onload = function() {
            const body = document.body;
            const headerElement = document.querySelector(".header") ?? document.querySelector(".project-header");
            const callback = function(entries, observer) {
                if (entries[0].isIntersecting) headerElement.classList.remove("_scroll"); else headerElement.classList.add("_scroll");
            };
            const headerObserver = new IntersectionObserver(callback);
            headerElement ? headerObserver.observe(headerElement) : null;
            const quizButton = document.querySelector(".quiz__button");
            if (quizButton) quizButton.addEventListener("click", (e => {
                e.preventDefault();
                Marquiz.showModal("62a9d7fb7cd214004ab0c35a");
            }));
            if ("/developers" === window.location.pathname) {
                const mainBlockDeveloper = document.querySelector(".main-blog_developers");
                if (mainBlockDeveloper) mainBlockDeveloper.classList.add("main-block-js");
            }
            if (body.dataset.convert) {
                const dataCurrency = body.dataset.convert.split(",");
                const api = `https://v6.exchangerate-api.com/v6/fb6a4624d4a8b975c011b97f/latest/${dataCurrency[0].toUpperCase()}`;
                function getResults() {
                    fetch(`${api}`).then((currency => currency.json())).then(displayResults);
                }
                function displayResults(currency) {
                    let fromRate = currency.conversion_rates[dataCurrency[0].toUpperCase()];
                    let toRate = currency.conversion_rates.USD;
                    const valueOfCurrency = (toRate / fromRate * dataCurrency[1]).toFixed(2);
                    console.log(currency.conversion_rates, valueOfCurrency);
                }
                getResults();
            }
            telInputHandler();
            if (document.querySelector(".questions__title")) {
                const questionTitle = document.querySelector(".questions__title");
                questionTitle.insertAdjacentHTML("beforeend", `<span class="questions__title-stroke">${questionTitle.innerHTML}</span>`);
            }
            if (window.innerWidth < 767.98) {
                const mainTabIndex = document.querySelector(".main-index-tabs");
                mainTabIndex.removeAttribute("data-tabs-titles");
                Array.from(mainTabIndex.children).forEach((item => {
                    item.removeAttribute("data-tabs-titles");
                    item.removeAttribute("data-tabs-body");
                }));
            }
        };
        document.addEventListener("click", documentActions);
        document.addEventListener("mouseover", (event => {
            const targetItem = event.target;
            if (window.innerWidth > 991) if (targetItem.closest(".menu__item")) {
                const menuItem = targetItem.closest(".menu__item");
                menuItem.classList.add("_hover");
            }
        }));
        document.addEventListener("mouseout", (event => {
            const targetItem = event.target;
            if (window.innerWidth > 991) if (targetItem.closest(".menu__item")) {
                const menuItem = targetItem.closest(".menu__item");
                menuItem.classList.remove("_hover");
            }
        }));
        function documentActions(e) {
            const targetitem = e.target;
            if (window.innerWidth > 768 && isMobile.any()) {
                if (targetitem.classList.contains("menu-project__link") || targetitem.classList.contains("menu-project__arrow")) targetitem.closest(".menu-project__item").classList.toggle("_hover");
                if (!targetitem.closest(".menu-project__item") && document.querySelectorAll(".menu-project__item._hover").length > 0) removeClasses(document.querySelectorAll(".menu-project__item._hover"), "_hover");
            }
            if (targetitem.closest(".menu__item")) {
                if (targetitem.closest(".menu__sub-blog")) return;
                targetitem.closest(".menu__item").classList.toggle("_hover");
            }
            if (targetitem.closest("[data-popup-content]")) {
                const dataPopupContent = targetitem.closest("[data-popup-content]").dataset.popupContent.split(",");
                const inputHiddenContents = document.querySelectorAll(".popup-discover__item_hidden input");
                for (let i = 0; i < dataPopupContent.length; i++) {
                    const input = inputHiddenContents[i];
                    input.value = dataPopupContent[i];
                }
            }
            if (targetitem.closest("[data-dropdown-button]")) targetitem.closest("[data-dropdown-parent]").classList.toggle("_active");
            if (!targetitem.closest("[data-dropdown-button]") && document.querySelectorAll("[data-dropdown-parent]._active").length > 0) removeClasses(document.querySelectorAll("[data-dropdown-parent]._active"), "_active");
            if (targetitem.closest("[data-currency-value]")) {
                const dataCurrency = targetitem.closest("[data-currency]");
                const dataCurrencyValue = targetitem.closest("[data-currency-value]").dataset.currencyValue;
                const dataCurrencySet = dataCurrency.querySelector("[data-currency-set]");
                let valueCurrency = dataCurrencyValue.split(",").join(" ");
                if (document.querySelectorAll("[data-currency-value]._selected").length > 0) {
                    removeClasses(document.querySelectorAll("[data-currency-value]._selected"), "_selected");
                    targetitem.closest("[data-currency-value]").classList.add("_selected");
                }
                dataCurrencySet.textContent = valueCurrency;
            }
            if (targetitem.closest("[data-get-gallery]")) console.log(flsModules.gallery[0].galleryClass.openGallery());
            if (isMobile.any()) {
                if (window.innerWidth > 767.98) {
                    if (targetitem.closest(".header-index-menu__label")) {
                        const parentElement = targetitem.closest(".header-index-menu__label").parentElement;
                        parentElement.classList.toggle("_hover");
                    }
                    if (!targetitem.closest(".header-index-menu__label") && document.querySelectorAll(".header-index-menu__button._hover").length > 0) removeClasses(document.querySelectorAll(".header-index-menu__button._hover"), "_hover");
                }
                if (targetitem.closest(".actions-header-index__label")) {
                    const parentElement = targetitem.closest(".actions-header-index__label").parentElement;
                    parentElement.classList.toggle("_hover");
                }
                if (!targetitem.closest(".actions-header-index__label") && document.querySelectorAll(".actions-header-index__choose-language._hover").length > 0) removeClasses(document.querySelectorAll(".actions-header-index__choose-language._hover"), "_hover");
            }
        }
        function telInputHandler() {
            const telInputs = document.querySelectorAll(".country-phones");
            if (telInputs.length) telInputs.forEach((input => {
                const inputIti = window.intlTelInput(input, {
                    preferredCountries: [ "us", "uz", "ru" ],
                    autoHideDialCode: false,
                    autoPlaceholder: "aggressive",
                    customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
                        return "" + selectedCountryPlaceholder.replace(/[0-9]/g, "X");
                    },
                    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.min.js"
                });
                $(input).on("focus click countrychange", (function(e, countryData) {
                    const pl = $(this).attr("placeholder") + "";
                    const res = pl.replace(/X/g, "9");
                    if ("undefined" != res) $(this).inputmask(res, {
                        placeholder: "X",
                        clearMaskOnLostFocus: true
                    });
                }));
                $(input).on("focusout", (function(e, countryData) {
                    const intlNumber = inputIti.getNumber();
                    console.log(intlNumber);
                }));
            }));
        }
        async function pageMore() {
            if (!document.querySelector(".properties-filter_projects")) {
                const $filterContent = $(".properties-filter .properties__content").isotope({
                    itemSelector: ".properties__item"
                });
                $(".properties-filter__actions").on("click", "button", (function() {
                    var sortValue = $(this).attr("data-filter");
                    $filterContent.isotope({
                        filter: sortValue
                    });
                }));
                $(".properties-filter__actions").each((function(i, buttonGroup) {
                    var $buttonGroup = $(buttonGroup);
                    $buttonGroup.on("click", "button", (function() {
                        $buttonGroup.find(".is-checked").removeClass("is-checked");
                        $(this).addClass("is-checked");
                    }));
                }));
            }
            if (document.querySelector(".properties__content_project")) {
                const $filterContent = $(".properties-filter .properties__content_project").isotope({
                    itemSelector: ".properties__project",
                    percentPosition: true,
                    masonry: {
                        columnWidth: ".properties__project"
                    }
                });
                $(".properties-filter__actions").on("click", "button", (function() {
                    var sortValue = $(this).attr("data-filter");
                    $filterContent.isotope({
                        filter: sortValue
                    });
                }));
                $(".properties-filter__actions").each((function(i, buttonGroup) {
                    var $buttonGroup = $(buttonGroup);
                    $buttonGroup.on("click", "button", (function() {
                        $buttonGroup.find(".is-checked").removeClass("is-checked");
                        $(this).addClass("is-checked");
                    }));
                }));
            }
        }
        async function pageHome() {
            if ("/" === location.pathname) {
                const mapElement = document.getElementById("map");
                if (mapElement) {
                    const map = new google.maps.Map(document.getElementById("map"), {
                        zoom: 12,
                        center: new google.maps.LatLng(25.0617177, 55.312431),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                    const infowindow = new google.maps.InfoWindow;
                    let marker, i;
                    for (i = 0; i < locations.length; i++) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                            map
                        });
                        google.maps.event.addListener(marker, "click", function(marker, i) {
                            return function() {
                                infowindow.setContent(locations[i][0]);
                                infowindow.open(map, marker);
                            };
                        }(marker, i));
                    }
                }
            }
        }
        var fast_deep_equal = __webpack_require__(63);
        var fast_deep_equal_default = __webpack_require__.n(fast_deep_equal);
        function sortKD(ids, coords, nodeSize, left, right, depth) {
            if (right - left <= nodeSize) return;
            const m = left + right >> 1;
            sort_select(ids, coords, m, left, right, depth % 2);
            sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
            sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
        }
        function sort_select(ids, coords, k, left, right, inc) {
            while (right > left) {
                if (right - left > 600) {
                    const n = right - left + 1;
                    const m = k - left + 1;
                    const z = Math.log(n);
                    const s = .5 * Math.exp(2 * z / 3);
                    const sd = .5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
                    const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
                    const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
                    sort_select(ids, coords, k, newLeft, newRight, inc);
                }
                const t = coords[2 * k + inc];
                let i = left;
                let j = right;
                swapItem(ids, coords, left, k);
                if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);
                while (i < j) {
                    swapItem(ids, coords, i, j);
                    i++;
                    j--;
                    while (coords[2 * i + inc] < t) i++;
                    while (coords[2 * j + inc] > t) j--;
                }
                if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j); else {
                    j++;
                    swapItem(ids, coords, j, right);
                }
                if (j <= k) left = j + 1;
                if (k <= j) right = j - 1;
            }
        }
        function swapItem(ids, coords, i, j) {
            swap(ids, i, j);
            swap(coords, 2 * i, 2 * j);
            swap(coords, 2 * i + 1, 2 * j + 1);
        }
        function swap(arr, i, j) {
            const tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
            const stack = [ 0, ids.length - 1, 0 ];
            const result = [];
            let x, y;
            while (stack.length) {
                const axis = stack.pop();
                const right = stack.pop();
                const left = stack.pop();
                if (right - left <= nodeSize) {
                    for (let i = left; i <= right; i++) {
                        x = coords[2 * i];
                        y = coords[2 * i + 1];
                        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
                    }
                    continue;
                }
                const m = Math.floor((left + right) / 2);
                x = coords[2 * m];
                y = coords[2 * m + 1];
                if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
                const nextAxis = (axis + 1) % 2;
                if (0 === axis ? minX <= x : minY <= y) {
                    stack.push(left);
                    stack.push(m - 1);
                    stack.push(nextAxis);
                }
                if (0 === axis ? maxX >= x : maxY >= y) {
                    stack.push(m + 1);
                    stack.push(right);
                    stack.push(nextAxis);
                }
            }
            return result;
        }
        function within(ids, coords, qx, qy, r, nodeSize) {
            const stack = [ 0, ids.length - 1, 0 ];
            const result = [];
            const r2 = r * r;
            while (stack.length) {
                const axis = stack.pop();
                const right = stack.pop();
                const left = stack.pop();
                if (right - left <= nodeSize) {
                    for (let i = left; i <= right; i++) if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
                    continue;
                }
                const m = Math.floor((left + right) / 2);
                const x = coords[2 * m];
                const y = coords[2 * m + 1];
                if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
                const nextAxis = (axis + 1) % 2;
                if (0 === axis ? qx - r <= x : qy - r <= y) {
                    stack.push(left);
                    stack.push(m - 1);
                    stack.push(nextAxis);
                }
                if (0 === axis ? qx + r >= x : qy + r >= y) {
                    stack.push(m + 1);
                    stack.push(right);
                    stack.push(nextAxis);
                }
            }
            return result;
        }
        function sqDist(ax, ay, bx, by) {
            const dx = ax - bx;
            const dy = ay - by;
            return dx * dx + dy * dy;
        }
        const defaultGetX = p => p[0];
        const defaultGetY = p => p[1];
        class KDBush {
            constructor(points, getX = defaultGetX, getY = defaultGetY, nodeSize = 64, ArrayType = Float64Array) {
                this.nodeSize = nodeSize;
                this.points = points;
                const IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;
                const ids = this.ids = new IndexArrayType(points.length);
                const coords = this.coords = new ArrayType(2 * points.length);
                for (let i = 0; i < points.length; i++) {
                    ids[i] = i;
                    coords[2 * i] = getX(points[i]);
                    coords[2 * i + 1] = getY(points[i]);
                }
                sortKD(ids, coords, nodeSize, 0, ids.length - 1, 0);
            }
            range(minX, minY, maxX, maxY) {
                return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
            }
            within(x, y, r) {
                return within(this.ids, this.coords, x, y, r, this.nodeSize);
            }
        }
        const defaultOptions = {
            minZoom: 0,
            maxZoom: 16,
            minPoints: 2,
            radius: 40,
            extent: 512,
            nodeSize: 64,
            log: false,
            generateId: false,
            reduce: null,
            map: props => props
        };
        const fround = Math.fround || (tmp => x => {
            tmp[0] = +x;
            return tmp[0];
        })(new Float32Array(1));
        class Supercluster {
            constructor(options) {
                this.options = supercluster_extend(Object.create(defaultOptions), options);
                this.trees = new Array(this.options.maxZoom + 1);
            }
            load(points) {
                const {log, minZoom, maxZoom, nodeSize} = this.options;
                if (log) console.time("total time");
                const timerId = `prepare ${points.length} points`;
                if (log) console.time(timerId);
                this.points = points;
                let clusters = [];
                for (let i = 0; i < points.length; i++) {
                    if (!points[i].geometry) continue;
                    clusters.push(createPointCluster(points[i], i));
                }
                this.trees[maxZoom + 1] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);
                if (log) console.timeEnd(timerId);
                for (let z = maxZoom; z >= minZoom; z--) {
                    const now = +Date.now();
                    clusters = this._cluster(clusters, z);
                    this.trees[z] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);
                    if (log) console.log("z%d: %d clusters in %dms", z, clusters.length, +Date.now() - now);
                }
                if (log) console.timeEnd("total time");
                return this;
            }
            getClusters(bbox, zoom) {
                let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
                const minLat = Math.max(-90, Math.min(90, bbox[1]));
                let maxLng = 180 === bbox[2] ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
                const maxLat = Math.max(-90, Math.min(90, bbox[3]));
                if (bbox[2] - bbox[0] >= 360) {
                    minLng = -180;
                    maxLng = 180;
                } else if (minLng > maxLng) {
                    const easternHem = this.getClusters([ minLng, minLat, 180, maxLat ], zoom);
                    const westernHem = this.getClusters([ -180, minLat, maxLng, maxLat ], zoom);
                    return easternHem.concat(westernHem);
                }
                const tree = this.trees[this._limitZoom(zoom)];
                const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
                const clusters = [];
                for (const id of ids) {
                    const c = tree.points[id];
                    clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
                }
                return clusters;
            }
            getChildren(clusterId) {
                const originId = this._getOriginId(clusterId);
                const originZoom = this._getOriginZoom(clusterId);
                const errorMsg = "No cluster with the specified id.";
                const index = this.trees[originZoom];
                if (!index) throw new Error(errorMsg);
                const origin = index.points[originId];
                if (!origin) throw new Error(errorMsg);
                const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
                const ids = index.within(origin.x, origin.y, r);
                const children = [];
                for (const id of ids) {
                    const c = index.points[id];
                    if (c.parentId === clusterId) children.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
                }
                if (0 === children.length) throw new Error(errorMsg);
                return children;
            }
            getLeaves(clusterId, limit, offset) {
                limit = limit || 10;
                offset = offset || 0;
                const leaves = [];
                this._appendLeaves(leaves, clusterId, limit, offset, 0);
                return leaves;
            }
            getTile(z, x, y) {
                const tree = this.trees[this._limitZoom(z)];
                const z2 = Math.pow(2, z);
                const {extent, radius} = this.options;
                const p = radius / extent;
                const top = (y - p) / z2;
                const bottom = (y + 1 + p) / z2;
                const tile = {
                    features: []
                };
                this._addTileFeatures(tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom), tree.points, x, y, z2, tile);
                if (0 === x) this._addTileFeatures(tree.range(1 - p / z2, top, 1, bottom), tree.points, z2, y, z2, tile);
                if (x === z2 - 1) this._addTileFeatures(tree.range(0, top, p / z2, bottom), tree.points, -1, y, z2, tile);
                return tile.features.length ? tile : null;
            }
            getClusterExpansionZoom(clusterId) {
                let expansionZoom = this._getOriginZoom(clusterId) - 1;
                while (expansionZoom <= this.options.maxZoom) {
                    const children = this.getChildren(clusterId);
                    expansionZoom++;
                    if (1 !== children.length) break;
                    clusterId = children[0].properties.cluster_id;
                }
                return expansionZoom;
            }
            _appendLeaves(result, clusterId, limit, offset, skipped) {
                const children = this.getChildren(clusterId);
                for (const child of children) {
                    const props = child.properties;
                    if (props && props.cluster) if (skipped + props.point_count <= offset) skipped += props.point_count; else skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped); else if (skipped < offset) skipped++; else result.push(child);
                    if (result.length === limit) break;
                }
                return skipped;
            }
            _addTileFeatures(ids, points, x, y, z2, tile) {
                for (const i of ids) {
                    const c = points[i];
                    const isCluster = c.numPoints;
                    let tags, px, py;
                    if (isCluster) {
                        tags = getClusterProperties(c);
                        px = c.x;
                        py = c.y;
                    } else {
                        const p = this.points[c.index];
                        tags = p.properties;
                        px = lngX(p.geometry.coordinates[0]);
                        py = latY(p.geometry.coordinates[1]);
                    }
                    const f = {
                        type: 1,
                        geometry: [ [ Math.round(this.options.extent * (px * z2 - x)), Math.round(this.options.extent * (py * z2 - y)) ] ],
                        tags
                    };
                    let id;
                    if (isCluster) id = c.id; else if (this.options.generateId) id = c.index; else if (this.points[c.index].id) id = this.points[c.index].id;
                    if (void 0 !== id) f.id = id;
                    tile.features.push(f);
                }
            }
            _limitZoom(z) {
                return Math.max(this.options.minZoom, Math.min(Math.floor(+z), this.options.maxZoom + 1));
            }
            _cluster(points, zoom) {
                const clusters = [];
                const {radius, extent, reduce, minPoints} = this.options;
                const r = radius / (extent * Math.pow(2, zoom));
                for (let i = 0; i < points.length; i++) {
                    const p = points[i];
                    if (p.zoom <= zoom) continue;
                    p.zoom = zoom;
                    const tree = this.trees[zoom + 1];
                    const neighborIds = tree.within(p.x, p.y, r);
                    const numPointsOrigin = p.numPoints || 1;
                    let numPoints = numPointsOrigin;
                    for (const neighborId of neighborIds) {
                        const b = tree.points[neighborId];
                        if (b.zoom > zoom) numPoints += b.numPoints || 1;
                    }
                    if (numPoints > numPointsOrigin && numPoints >= minPoints) {
                        let wx = p.x * numPointsOrigin;
                        let wy = p.y * numPointsOrigin;
                        let clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;
                        const id = (i << 5) + (zoom + 1) + this.points.length;
                        for (const neighborId of neighborIds) {
                            const b = tree.points[neighborId];
                            if (b.zoom <= zoom) continue;
                            b.zoom = zoom;
                            const numPoints2 = b.numPoints || 1;
                            wx += b.x * numPoints2;
                            wy += b.y * numPoints2;
                            b.parentId = id;
                            if (reduce) {
                                if (!clusterProperties) clusterProperties = this._map(p, true);
                                reduce(clusterProperties, this._map(b));
                            }
                        }
                        p.parentId = id;
                        clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));
                    } else {
                        clusters.push(p);
                        if (numPoints > 1) for (const neighborId of neighborIds) {
                            const b = tree.points[neighborId];
                            if (b.zoom <= zoom) continue;
                            b.zoom = zoom;
                            clusters.push(b);
                        }
                    }
                }
                return clusters;
            }
            _getOriginId(clusterId) {
                return clusterId - this.points.length >> 5;
            }
            _getOriginZoom(clusterId) {
                return (clusterId - this.points.length) % 32;
            }
            _map(point, clone) {
                if (point.numPoints) return clone ? supercluster_extend({}, point.properties) : point.properties;
                const original = this.points[point.index].properties;
                const result = this.options.map(original);
                return clone && result === original ? supercluster_extend({}, result) : result;
            }
        }
        function createCluster(x, y, id, numPoints, properties) {
            return {
                x: fround(x),
                y: fround(y),
                zoom: 1 / 0,
                id,
                parentId: -1,
                numPoints,
                properties
            };
        }
        function createPointCluster(p, id) {
            const [x, y] = p.geometry.coordinates;
            return {
                x: fround(lngX(x)),
                y: fround(latY(y)),
                zoom: 1 / 0,
                index: id,
                parentId: -1
            };
        }
        function getClusterJSON(cluster) {
            return {
                type: "Feature",
                id: cluster.id,
                properties: getClusterProperties(cluster),
                geometry: {
                    type: "Point",
                    coordinates: [ xLng(cluster.x), yLat(cluster.y) ]
                }
            };
        }
        function getClusterProperties(cluster) {
            const count = cluster.numPoints;
            const abbrev = count >= 1e4 ? `${Math.round(count / 1e3)}k` : count >= 1e3 ? `${Math.round(count / 100) / 10}k` : count;
            return supercluster_extend(supercluster_extend({}, cluster.properties), {
                cluster: true,
                cluster_id: cluster.id,
                point_count: count,
                point_count_abbreviated: abbrev
            });
        }
        function lngX(lng) {
            return lng / 360 + .5;
        }
        function latY(lat) {
            const sin = Math.sin(lat * Math.PI / 180);
            const y = .5 - .25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
            return y < 0 ? 0 : y > 1 ? 1 : y;
        }
        function xLng(x) {
            return 360 * (x - .5);
        }
        function yLat(y) {
            const y2 = (180 - 360 * y) * Math.PI / 180;
            return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
        }
        function supercluster_extend(dest, src) {
            for (const id in src) dest[id] = src[id];
            return dest;
        }
        function getX(p) {
            return p.x;
        }
        function getY(p) {
            return p.y;
        }
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        function __rest(s, e) {
            var t = {};
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
            if (null != s && "function" === typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
            }
            return t;
        }
        class Cluster {
            constructor({markers, position}) {
                this.markers = markers;
                if (position) if (position instanceof google.maps.LatLng) this._position = position; else this._position = new google.maps.LatLng(position);
            }
            get bounds() {
                if (0 === this.markers.length && !this._position) return;
                return this.markers.reduce(((bounds, marker) => bounds.extend(marker.getPosition())), new google.maps.LatLngBounds(this._position, this._position));
            }
            get position() {
                return this._position || this.bounds.getCenter();
            }
            get count() {
                return this.markers.filter((m => m.getVisible())).length;
            }
            push(marker) {
                this.markers.push(marker);
            }
            delete() {
                if (this.marker) {
                    this.marker.setMap(null);
                    delete this.marker;
                }
                this.markers.length = 0;
            }
        }
        class AbstractAlgorithm {
            constructor({maxZoom = 16}) {
                this.maxZoom = maxZoom;
            }
            noop({markers}) {
                return noop(markers);
            }
        }
        const noop = markers => {
            const clusters = markers.map((marker => new Cluster({
                position: marker.getPosition(),
                markers: [ marker ]
            })));
            return clusters;
        };
        class SuperClusterAlgorithm extends AbstractAlgorithm {
            constructor(_a) {
                var {maxZoom, radius = 60} = _a, options = __rest(_a, [ "maxZoom", "radius" ]);
                super({
                    maxZoom
                });
                this.superCluster = new Supercluster(Object.assign({
                    maxZoom: this.maxZoom,
                    radius
                }, options));
                this.state = {
                    zoom: null
                };
            }
            calculate(input) {
                let changed = false;
                if (!fast_deep_equal_default()(input.markers, this.markers)) {
                    changed = true;
                    this.markers = [ ...input.markers ];
                    const points = this.markers.map((marker => ({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [ marker.getPosition().lng(), marker.getPosition().lat() ]
                        },
                        properties: {
                            marker
                        }
                    })));
                    this.superCluster.load(points);
                }
                const state = {
                    zoom: input.map.getZoom()
                };
                if (!changed) if (this.state.zoom > this.maxZoom && state.zoom > this.maxZoom) ; else changed = changed || !fast_deep_equal_default()(this.state, state);
                this.state = state;
                if (changed) this.clusters = this.cluster(input);
                return {
                    clusters: this.clusters,
                    changed
                };
            }
            cluster({map}) {
                return this.superCluster.getClusters([ -180, -90, 180, 90 ], Math.round(map.getZoom())).map(this.transformCluster.bind(this));
            }
            transformCluster({geometry: {coordinates: [lng, lat]}, properties}) {
                if (properties.cluster) return new Cluster({
                    markers: this.superCluster.getLeaves(properties.cluster_id, 1 / 0).map((leaf => leaf.properties.marker)),
                    position: new google.maps.LatLng({
                        lat,
                        lng
                    })
                }); else {
                    const marker = properties.marker;
                    return new Cluster({
                        markers: [ marker ],
                        position: marker.getPosition()
                    });
                }
            }
        }
        class ClusterStats {
            constructor(markers, clusters) {
                this.markers = {
                    sum: markers.length
                };
                const clusterMarkerCounts = clusters.map((a => a.count));
                const clusterMarkerSum = clusterMarkerCounts.reduce(((a, b) => a + b), 0);
                this.clusters = {
                    count: clusters.length,
                    markers: {
                        mean: clusterMarkerSum / clusters.length,
                        sum: clusterMarkerSum,
                        min: Math.min(...clusterMarkerCounts),
                        max: Math.max(...clusterMarkerCounts)
                    }
                };
            }
        }
        class DefaultRenderer {
            render({count, position}, stats) {
                const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
                const svg = window.btoa(`\n  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">\n    <circle cx="120" cy="120" opacity=".6" r="70" />\n    <circle cx="120" cy="120" opacity=".3" r="90" />\n    <circle cx="120" cy="120" opacity=".2" r="110" />\n  </svg>`);
                return new google.maps.Marker({
                    position,
                    icon: {
                        url: `data:image/svg+xml;base64,${svg}`,
                        scaledSize: new google.maps.Size(45, 45)
                    },
                    label: {
                        text: String(count),
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "12px"
                    },
                    title: `Cluster of ${count} markers`,
                    zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count
                });
            }
        }
        function index_esm_extend(type1, type2) {
            for (let property in type2.prototype) type1.prototype[property] = type2.prototype[property];
        }
        class OverlayViewSafe {
            constructor() {
                index_esm_extend(OverlayViewSafe, google.maps.OverlayView);
            }
        }
        var MarkerClustererEvents;
        (function(MarkerClustererEvents) {
            MarkerClustererEvents["CLUSTERING_BEGIN"] = "clusteringbegin";
            MarkerClustererEvents["CLUSTERING_END"] = "clusteringend";
            MarkerClustererEvents["CLUSTER_CLICK"] = "click";
        })(MarkerClustererEvents || (MarkerClustererEvents = {}));
        const defaultOnClusterClickHandler = (_, cluster, map) => {
            map.fitBounds(cluster.bounds);
        };
        class MarkerClusterer extends OverlayViewSafe {
            constructor({map, markers = [], algorithm = new SuperClusterAlgorithm({}), renderer = new DefaultRenderer, onClusterClick = defaultOnClusterClickHandler}) {
                super();
                this.markers = [ ...markers ];
                this.clusters = [];
                this.algorithm = algorithm;
                this.renderer = renderer;
                this.onClusterClick = onClusterClick;
                if (map) this.setMap(map);
            }
            addMarker(marker, noDraw) {
                if (this.markers.includes(marker)) return;
                this.markers.push(marker);
                if (!noDraw) this.render();
            }
            addMarkers(markers, noDraw) {
                markers.forEach((marker => {
                    this.addMarker(marker, true);
                }));
                if (!noDraw) this.render();
            }
            removeMarker(marker, noDraw) {
                const index = this.markers.indexOf(marker);
                if (-1 === index) return false;
                marker.setMap(null);
                this.markers.splice(index, 1);
                if (!noDraw) this.render();
                return true;
            }
            removeMarkers(markers, noDraw) {
                let removed = false;
                markers.forEach((marker => {
                    removed = this.removeMarker(marker, true) || removed;
                }));
                if (removed && !noDraw) this.render();
                return removed;
            }
            clearMarkers(noDraw) {
                this.markers.length = 0;
                if (!noDraw) this.render();
            }
            render() {
                const map = this.getMap();
                if (map instanceof google.maps.Map && this.getProjection()) {
                    google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
                    const {clusters, changed} = this.algorithm.calculate({
                        markers: this.markers,
                        map,
                        mapCanvasProjection: this.getProjection()
                    });
                    if (changed || void 0 == changed) {
                        this.reset();
                        this.clusters = clusters;
                        this.renderClusters();
                    }
                    google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
                }
            }
            onAdd() {
                this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
                this.render();
            }
            onRemove() {
                google.maps.event.removeListener(this.idleListener);
                this.reset();
            }
            reset() {
                this.markers.forEach((marker => marker.setMap(null)));
                this.clusters.forEach((cluster => cluster.delete()));
                this.clusters = [];
            }
            renderClusters() {
                const stats = new ClusterStats(this.markers, this.clusters);
                const map = this.getMap();
                this.clusters.forEach((cluster => {
                    if (1 === cluster.markers.length) cluster.marker = cluster.markers[0]; else {
                        cluster.marker = this.renderer.render(cluster, stats);
                        if (this.onClusterClick) cluster.marker.addListener("click", (event => {
                            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
                            this.onClusterClick(event, cluster, map);
                        }));
                    }
                    cluster.marker.setMap(map);
                }));
            }
        }
        async function pageMap() {
            if ("/map.html" === location.pathname) {
                const map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 10,
                    center: {
                        lat: 25.0990514,
                        lng: 55.2840639
                    }
                });
                var locations = [];
                var markers = [];
                var marker1 = [];
                var title = [];
                var img = [];
                var infowindow = new google.maps.InfoWindow;
                for (var i = 0; i < data.length; i++) {
                    locations[i] = {
                        lat: parseFloat(data[i].latitude),
                        lng: parseFloat(data[i].longitude)
                    };
                    marker1[i] = new google.maps.Marker({
                        position: locations[i],
                        map
                    });
                    markers.push(marker1[i]);
                }
                for (i = 0; i < data.length; i++) {
                    title[i] = data[i].title;
                    img[i] = data[i].mainphoto;
                    google.maps.event.addListener(markers[i], "click", function(markers, i) {
                        return function() {
                            infowindow.setContent("<div style='float:left'><a href='/project.html#" + data[i].id + "'><img src='" + img[i] + "' width='200px' height='200px'></a></div><div style='float:right; padding: 10px;'><b>" + title[i] + "</b><br/>" + data[i].starting_price + "<br/>" + data[i].area + "</div>");
                            infowindow.open(map, markers[i]);
                        };
                    }(markers, i));
                }
                const clusterOptions = {
                    zoomOnClick: true
                };
                new MarkerClusterer({
                    markers,
                    map,
                    clusterOptions
                });
            }
        }
        window["FLS"] = false;
        addTouchClass();
        menuInit();
        fullVHfix();
        spollers();
        tabs();
        showMore();
        formFieldsInit({
            viewPass: false
        });
        formSubmit();
        headerScroll();
        Date.prototype.addDays = function(days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        };
        pageMore();
        pageHome();
        pageMap();
    })();
})();