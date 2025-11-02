# frozen_string_literal: true

require 'spec_helper'
require_relative '../../_plugins/localized_date'

RSpec.describe Jekyll::LocalizedDateFilter do
  let(:site) do
    Jekyll::Site.new(
      Jekyll.configuration(
        'source' => File.expand_path('../..', __dir__),
        'lang' => 'en',
        'plugins' => []
      )
    )
  end

  let(:filter) do
    filter_class = Class.new do
      include Jekyll::LocalizedDateFilter

      attr_accessor :context

      def initialize(site)
        @context = Liquid::Context.new(
          {},
          {},
          { site: site }
        )
      end
    end
    filter_class.new(site)
  end

  describe '#localized_date' do
    let(:date) { Time.new(2025, 1, 15) }

    context 'with English locale' do
      it 'formats date in English' do
        expect(filter.localized_date(date)).to eq('January 15, 2025')
      end
    end

    context 'with Italian locale' do
      it 'formats date in Italian' do
        site.config['lang'] = 'it'
        filter.context.registers[:site].config['lang'] = 'it'
        expect(filter.localized_date(date)).to eq('15 gennaio 2025')
      end
    end

    context 'with German locale' do
      it 'formats date in German' do
        site.config['lang'] = 'de'
        filter.context.registers[:site].config['lang'] = 'de'
        expect(filter.localized_date(date)).to eq('15 Januar 2025')
      end
    end

    context 'with French locale' do
      it 'formats date in French' do
        site.config['lang'] = 'fr'
        filter.context.registers[:site].config['lang'] = 'fr'
        expect(filter.localized_date(date)).to eq('15 janvier 2025')
      end
    end

    context 'with Spanish locale' do
      it 'formats date in Spanish' do
        site.config['lang'] = 'es'
        filter.context.registers[:site].config['lang'] = 'es'
        expect(filter.localized_date(date)).to eq('15 enero 2025')
      end
    end

    context 'with unsupported locale' do
      it 'falls back to English' do
        site.config['lang'] = 'jp'
        filter.context.registers[:site].config['lang'] = 'jp'
        expect(filter.localized_date(date)).to eq('January 15, 2025')
      end
    end

    context 'with string date input' do
      let(:date) { '2025-01-15' }

      it 'returns the string as-is' do
        expect(filter.localized_date(date)).to eq('2025-01-15')
      end
    end

    context 'with nil input' do
      let(:date) { nil }

      it 'returns nil' do
        expect(filter.localized_date(date)).to be_nil
      end
    end
  end
end
