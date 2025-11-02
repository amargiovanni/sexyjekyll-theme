# frozen_string_literal: true

module Jekyll
  module LocalizedDateFilter
    MONTHS = {
      'it' => %w[
        gennaio febbraio marzo aprile maggio giugno
        luglio agosto settembre ottobre novembre dicembre
      ],
      'en' => %w[
        January February March April May June
        July August September October November December
      ],
      'de' => %w[
        Januar Februar März April Mai Juni
        Juli August September Oktober November Dezember
      ],
      'fr' => %w[
        janvier février mars avril mai juin
        juillet août septembre octobre novembre décembre
      ],
      'es' => %w[
        enero febrero marzo abril mayo junio
        julio agosto septiembre octubre noviembre diciembre
      ]
    }.freeze

    def localized_date(date)
      return date unless date.is_a?(Time) || date.is_a?(Date)

      # Get the site language from Jekyll config, default to 'en'
      lang = @context.registers[:site].config['lang'] || 'en'

      day = date.day
      month = MONTHS[lang][date.month - 1]
      year = date.year

      # English uses "Month Day, Year" format (e.g., "October 31, 2025")
      # Other languages use "Day Month Year" format (e.g., "31 ottobre 2025")
      if lang == 'en'
        "#{month} #{day}, #{year}"
      else
        "#{day} #{month} #{year}"
      end
    end

    # Keep italian_date for backward compatibility
    def italian_date(date)
      return date unless date.is_a?(Time) || date.is_a?(Date)

      day = date.day
      month = MONTHS['it'][date.month - 1]
      year = date.year

      "#{day} #{month} #{year}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::LocalizedDateFilter)
