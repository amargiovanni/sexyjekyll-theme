# frozen_string_literal: true

require 'spec_helper'
require_relative '../../_plugins/localized_date'

RSpec.describe Jekyll::LocalizedDate do
  let(:site) do
    Jekyll::Site.new(
      Jekyll.configuration(
        'source' => File.expand_path('../..', __dir__),
        'lang' => 'en'
      )
    )
  end

  let(:filter) do
    Class.new do
      include Jekyll::LocalizedDate

      attr_accessor :context

      def initialize(site)
        @context = { 'site' => { 'lang' => site.config['lang'] } }
      end
    end.new(site)
  end

  describe '#localized_date' do
    let(:date) { Time.new(2025, 1, 15) }

    context 'with English locale' do
      it 'formats date in English' do
        expect(filter.localized_date(date)).to eq('15 January 2025')
      end
    end

    context 'with Italian locale' do
      before { site.config['lang'] = 'it' }

      it 'formats date in Italian' do
        filter.context['site']['lang'] = 'it'
        expect(filter.localized_date(date)).to eq('15 gennaio 2025')
      end
    end

    context 'with German locale' do
      before { site.config['lang'] = 'de' }

      it 'formats date in German' do
        filter.context['site']['lang'] = 'de'
        expect(filter.localized_date(date)).to eq('15 Januar 2025')
      end
    end

    context 'with French locale' do
      before { site.config['lang'] = 'fr' }

      it 'formats date in French' do
        filter.context['site']['lang'] = 'fr'
        expect(filter.localized_date(date)).to eq('15 janvier 2025')
      end
    end

    context 'with Spanish locale' do
      before { site.config['lang'] = 'es' }

      it 'formats date in Spanish' do
        filter.context['site']['lang'] = 'es'
        expect(filter.localized_date(date)).to eq('15 enero 2025')
      end
    end

    context 'with unsupported locale' do
      before { site.config['lang'] = 'jp' }

      it 'falls back to English' do
        filter.context['site']['lang'] = 'jp'
        expect(filter.localized_date(date)).to eq('15 January 2025')
      end
    end

    context 'with string date input' do
      let(:date) { '2025-01-15' }

      it 'parses and formats the date' do
        expect(filter.localized_date(date)).to eq('15 January 2025')
      end
    end

    context 'with nil input' do
      let(:date) { nil }

      it 'returns empty string' do
        expect(filter.localized_date(date)).to eq('')
      end
    end
  end
end
