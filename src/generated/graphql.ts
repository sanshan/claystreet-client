import {gql} from 'apollo-angular';
import {Injectable} from '@angular/core';
import * as Apollo from 'apollo-angular';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type SheetsApiQuery = {
  __typename?: 'SheetsApiQuery';
  SheetsApi?: Maybe<SheetsResources>;
};


export type SheetsApiQuerySheetsApiArgs = {
  key?: Maybe<Scalars['String']>;
  access_token?: Maybe<Scalars['String']>;
  upload_protocol?: Maybe<Scalars['String']>;
  prettyPrint?: Maybe<Scalars['Boolean']>;
  quotaUser?: Maybe<Scalars['String']>;
  fields?: Maybe<Scalars['String']>;
  uploadType?: Maybe<Scalars['String']>;
  dollardotxgafv?: Maybe<DollardotxgafvRootEnumParam>;
  oauth_token?: Maybe<Scalars['String']>;
  callback?: Maybe<Scalars['String']>;
  alt?: Maybe<AltRootEnumParam>;
};

export enum DollardotxgafvRootEnumParam {
  /** v1 error format */
    // @ts-ignore
    '1' = '_1',
  /** v2 error format */
    // @ts-ignore
    '2' = '_2'
}

export enum AltRootEnumParam {
  /** Responses with Content-Type of application/json */
  Json = 'json',
  /** Media download with context-dependent Content-Type */
  Media = 'media',
  /** Responses with Content-Type of application/x-protobuf */
  Proto = 'proto'
}

export type SheetsResources = {
  __typename?: 'SheetsResources';
  spreadsheets?: Maybe<Spreadsheets_>;
};

export type Spreadsheets_ = {
  __typename?: 'Spreadsheets_';
  /**
   * Returns the spreadsheet at the given ID.
   * The caller must specify the spreadsheet ID.
   *
   * By default, data within grids will not be returned.
   * You can include grid data one of two ways:
   *
   * * Specify a field mask listing your desired fields using the `fields` URL
   * parameter in HTTP
   *
   * * Set the includeGridData
   * URL parameter to true.  If a field mask is set, the `includeGridData`
   * parameter is ignored
   *
   * For large spreadsheets, it is recommended to retrieve only the specific
   * fields of the spreadsheet that you want.
   *
   * To retrieve only subsets of the spreadsheet, use the
   * ranges URL parameter.
   * Multiple ranges can be specified.  Limiting the range will
   * return only the portions of the spreadsheet that intersect the requested
   * ranges. Ranges are specified using A1 notation.
   */
  get?: Maybe<Spreadsheet>;
};


export type Spreadsheets_GetArgs = {
  spreadsheetId: Scalars['String'];
  ranges?: Maybe<Scalars['String']>;
  includeGridData?: Maybe<Scalars['Boolean']>;
};

/** Resource that represents a spreadsheet. */
export type Spreadsheet = {
  __typename?: 'Spreadsheet';
  /** The sheets that are part of a spreadsheet. */
  sheets?: Maybe<Array<Maybe<Sheet>>>;
  /**
   * The url of the spreadsheet.
   * This field is read-only.
   */
  spreadsheetUrl?: Maybe<Scalars['String']>;
  /** Overall properties of a spreadsheet. */
  properties?: Maybe<SpreadsheetProperties>;
  /**
   * The ID of the spreadsheet.
   * This field is read-only.
   */
  spreadsheetId?: Maybe<Scalars['String']>;
  /** The named ranges defined in a spreadsheet. */
  namedRanges?: Maybe<Array<Maybe<NamedRange>>>;
  /** The developer metadata associated with a spreadsheet. */
  developerMetadata?: Maybe<Array<Maybe<DeveloperMetadata>>>;
};

/** A sheet in a spreadsheet. */
export type Sheet = {
  __typename?: 'Sheet';
  /** The filter on this sheet, if any. */
  basicFilter?: Maybe<BasicFilter>;
  /** The ranges that are merged together. */
  merges?: Maybe<Array<Maybe<GridRange>>>;
  /** The banded (alternating colors) ranges on this sheet. */
  bandedRanges?: Maybe<Array<Maybe<BandedRange>>>;
  /** The specifications of every chart on this sheet. */
  charts?: Maybe<Array<Maybe<EmbeddedChart>>>;
  /** The filter views in this sheet. */
  filterViews?: Maybe<Array<Maybe<FilterView>>>;
  /**
   * All row groups on this sheet, ordered by increasing range start index, then
   * by group depth.
   */
  rowGroups?: Maybe<Array<Maybe<DimensionGroup>>>;
  /**
   * Data in the grid, if this is a grid sheet.
   * The number of GridData objects returned is dependent on the number of
   * ranges requested on this sheet. For example, if this is representing
   * `Sheet1`, and the spreadsheet was requested with ranges
   * `Sheet1!A1:C10` and `Sheet1!D15:E20`, then the first GridData will have a
   * startRow/startColumn of `0`,
   * while the second one will have `startRow 14` (zero-based row 15),
   * and `startColumn 3` (zero-based column D).
   */
  data?: Maybe<Array<Maybe<GridData>>>;
  /** The properties of the sheet. */
  properties?: Maybe<SheetProperties>;
  /** The developer metadata associated with a sheet. */
  developerMetadata?: Maybe<Array<Maybe<DeveloperMetadata>>>;
  /** The protected ranges in this sheet. */
  protectedRanges?: Maybe<Array<Maybe<ProtectedRange>>>;
  /** The conditional format rules in this sheet. */
  conditionalFormats?: Maybe<Array<Maybe<ConditionalFormatRule>>>;
  /**
   * All column groups on this sheet, ordered by increasing range start index,
   * then by group depth.
   */
  columnGroups?: Maybe<Array<Maybe<DimensionGroup>>>;
};

/** The default filter associated with a sheet. */
export type BasicFilter = {
  __typename?: 'BasicFilter';
  /** The range the filter covers. */
  range?: Maybe<GridRange>;
  /**
   * The sort order per column. Later specifications are used when values
   * are equal in the earlier specifications.
   */
  sortSpecs?: Maybe<Array<Maybe<SortSpec>>>;
};

/**
 * A range on a sheet.
 * All indexes are zero-based.
 * Indexes are half open, e.g the start index is inclusive
 * and the end index is exclusive -- [start_index, end_index).
 * Missing indexes indicate the range is unbounded on that side.
 *
 * For example, if `"Sheet1"` is sheet ID 0, then:
 *
 *   `Sheet1!A1:A1 == sheet_id: 0,
 *                   start_row_index: 0, end_row_index: 1,
 *                   start_column_index: 0, end_column_index: 1`
 *
 *   `Sheet1!A3:B4 == sheet_id: 0,
 *                   start_row_index: 2, end_row_index: 4,
 *                   start_column_index: 0, end_column_index: 2`
 *
 *   `Sheet1!A:B == sheet_id: 0,
 *                 start_column_index: 0, end_column_index: 2`
 *
 *   `Sheet1!A5:B == sheet_id: 0,
 *                  start_row_index: 4,
 *                  start_column_index: 0, end_column_index: 2`
 *
 *   `Sheet1 == sheet_id:0`
 *
 * The start index must always be less than or equal to the end index.
 * If the start index equals the end index, then the range is empty.
 * Empty ranges are typically not meaningful and are usually rendered in the
 * UI as `#REF!`.
 */
export type GridRange = {
  __typename?: 'GridRange';
  /** The end row (exclusive) of the range, or not set if unbounded. */
  endRowIndex?: Maybe<Scalars['Int']>;
  /** The end column (exclusive) of the range, or not set if unbounded. */
  endColumnIndex?: Maybe<Scalars['Int']>;
  /** The start row (inclusive) of the range, or not set if unbounded. */
  startRowIndex?: Maybe<Scalars['Int']>;
  /** The start column (inclusive) of the range, or not set if unbounded. */
  startColumnIndex?: Maybe<Scalars['Int']>;
  /** The sheet this range is on. */
  sheetId?: Maybe<Scalars['Int']>;
};

/** A sort order associated with a specific column or row. */
export type SortSpec = {
  __typename?: 'SortSpec';
  /** The dimension the sort should be applied to. */
  dimensionIndex?: Maybe<Scalars['Int']>;
  /** The order data should be sorted. */
  sortOrder?: Maybe<Scalars['String']>;
};

/** A banded (alternating colors) range in a sheet. */
export type BandedRange = {
  __typename?: 'BandedRange';
  /**
   * Properties for row bands. These properties are applied on a row-by-row
   * basis throughout all the rows in the range. At least one of
   * row_properties or column_properties must be specified.
   */
  rowProperties?: Maybe<BandingProperties>;
  /**
   * Properties for column bands. These properties are applied on a column-
   * by-column basis throughout all the columns in the range. At least one of
   * row_properties or column_properties must be specified.
   */
  columnProperties?: Maybe<BandingProperties>;
  /** The range over which these properties are applied. */
  range?: Maybe<GridRange>;
  /** The id of the banded range. */
  bandedRangeId?: Maybe<Scalars['Int']>;
};

/**
 * Properties referring a single dimension (either row or column). If both
 * BandedRange.row_properties and BandedRange.column_properties are
 * set, the fill colors are applied to cells according to the following rules:
 *
 * * header_color and footer_color take priority over band colors.
 * * first_band_color takes priority over second_band_color.
 * * row_properties takes priority over column_properties.
 *
 * For example, the first row color takes priority over the first column
 * color, but the first column color takes priority over the second row color.
 * Similarly, the row header takes priority over the column header in the
 * top left cell, but the column header takes priority over the first row
 * color if the row header is not set.
 */
export type BandingProperties = {
  __typename?: 'BandingProperties';
  /** The first color that is alternating. (Required) */
  firstBandColor?: Maybe<Color>;
  /** The second color that is alternating. (Required) */
  secondBandColor?: Maybe<Color>;
  /**
   * The color of the last row or column. If this field is not set, the last
   * row or column will be filled with either first_band_color or
   * second_band_color, depending on the color of the previous row or
   * column.
   */
  footerColor?: Maybe<Color>;
  /**
   * The color of the first row or column. If this field is set, the first
   * row or column will be filled with this color and the colors will
   * alternate between first_band_color and second_band_color starting
   * from the second row or column. Otherwise, the first row or column will be
   * filled with first_band_color and the colors will proceed to alternate
   * as they normally would.
   */
  headerColor?: Maybe<Color>;
};

/**
 * Represents a color in the RGBA color space. This representation is designed
 * for simplicity of conversion to/from color representations in various
 * languages over compactness; for example, the fields of this representation
 * can be trivially provided to the constructor of "java.awt.Color" in Java; it
 * can also be trivially provided to UIColor's "+colorWithRed:green:blue:alpha"
 * method in iOS; and, with just a little work, it can be easily formatted into
 * a CSS "rgba()" string in JavaScript, as well.
 *
 * Note: this proto does not carry information about the absolute color space
 * that should be used to interpret the RGB value (e.g. sRGB, Adobe RGB,
 * DCI-P3, BT.2020, etc.). By default, applications SHOULD assume the sRGB color
 * space.
 *
 * Example (Java):
 *
 *      import com.google.type.Color;
 *
 *      // ...
 *      public static java.awt.Color fromProto(Color protocolor) {
 *        float alpha = protocolor.hasAlpha()
 *            ? protocolor.getAlpha().getValue()
 *            : 1.0;
 *
 *        return new java.awt.Color(
 *            protocolor.getRed(),
 *            protocolor.getGreen(),
 *            protocolor.getBlue(),
 *            alpha);
 *      }
 *
 *      public static Color toProto(java.awt.Color color) {
 *        float red = (float) color.getRed();
 *        float green = (float) color.getGreen();
 *        float blue = (float) color.getBlue();
 *        float denominator = 255.0;
 *        Color.Builder resultBuilder =
 *            Color
 *                .newBuilder()
 *                .setRed(red / denominator)
 *                .setGreen(green / denominator)
 *                .setBlue(blue / denominator);
 *        int alpha = color.getAlpha();
 *        if (alpha != 255) {
 *          result.setAlpha(
 *              FloatValue
 *                  .newBuilder()
 *                  .setValue(((float) alpha) / denominator)
 *                  .build());
 *        }
 *        return resultBuilder.build();
 *      }
 *      // ...
 *
 * Example (iOS / Obj-C):
 *
 *      // ...
 *      static UIColor* fromProto(Color* protocolor) {
 *         float red = [protocolor red];
 *         float green = [protocolor green];
 *         float blue = [protocolor blue];
 *         FloatValue* alpha_wrapper = [protocolor alpha];
 *         float alpha = 1.0;
 *         if (alpha_wrapper != nil) {
 *           alpha = [alpha_wrapper value];
 *         }
 *         return [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
 *      }
 *
 *      static Color* toProto(UIColor* color) {
 *          CGFloat red, green, blue, alpha;
 *          if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) {
 *            return nil;
 *          }
 *          Color* result = [[Color alloc] init];
 *          [result setRed:red];
 *          [result setGreen:green];
 *          [result setBlue:blue];
 *          if (alpha <= 0.9999) {
 *            [result setAlpha:floatWrapperWithValue(alpha)];
 *          }
 *          [result autorelease];
 *          return result;
 *     }
 *     // ...
 *
 *  Example (JavaScript):
 *
 *     // ...
 *
 *     var protoToCssColor = function(rgb_color) {
 *        var redFrac = rgb_color.red || 0.0;
 *        var greenFrac = rgb_color.green || 0.0;
 *        var blueFrac = rgb_color.blue || 0.0;
 *        var red = Math.floor(redFrac * 255);
 *        var green = Math.floor(greenFrac * 255);
 *        var blue = Math.floor(blueFrac * 255);
 *
 *        if (!('alpha' in rgb_color)) {
 *           return rgbToCssColor_(red, green, blue);
 *        }
 *
 *        var alphaFrac = rgb_color.alpha.value || 0.0;
 *        var rgbParams = [red, green, blue].join(',');
 *        return ['rgba(', rgbParams, ',', alphaFrac, ')'].join('');
 *     };
 *
 *     var rgbToCssColor_ = function(red, green, blue) {
 *       var rgbNumber = new Number((red << 16) | (green << 8) | blue);
 *       var hexString = rgbNumber.toString(16);
 *       var missingZeros = 6 - hexString.length;
 *       var resultBuilder = ['#'];
 *       for (var i = 0; i < missingZeros; i++) {
 *          resultBuilder.push('0');
 *       }
 *       resultBuilder.push(hexString);
 *       return resultBuilder.join('');
 *     };
 *
 *     // ...
 */
export type Color = {
  __typename?: 'Color';
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: Maybe<Scalars['Int']>;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: Maybe<Scalars['Int']>;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: Maybe<Scalars['Int']>;
  /**
   * The fraction of this color that should be applied to the pixel. That is,
   * the final pixel color is defined by the equation:
   *
   *   pixel color = alpha * (this color) + (1.0 - alpha) * (background color)
   *
   * This means that a value of 1.0 corresponds to a solid color, whereas
   * a value of 0.0 corresponds to a completely transparent color. This
   * uses a wrapper message rather than a simple float scalar so that it is
   * possible to distinguish between a default value and the value being unset.
   * If omitted, this color object is to be rendered as a solid color
   * (as if the alpha value had been explicitly given with a value of 1.0).
   */
  alpha?: Maybe<Scalars['Int']>;
};

/** A chart embedded in a sheet. */
export type EmbeddedChart = {
  __typename?: 'EmbeddedChart';
  /** The ID of the chart. */
  chartId?: Maybe<Scalars['Int']>;
  /** The position of the chart. */
  position?: Maybe<EmbeddedObjectPosition>;
  /** The specification of the chart. */
  spec?: Maybe<ChartSpec>;
};

/** The position of an embedded object such as a chart. */
export type EmbeddedObjectPosition = {
  __typename?: 'EmbeddedObjectPosition';
  /**
   * If true, the embedded object is put on a new sheet whose ID
   * is chosen for you. Used only when writing.
   */
  newSheet?: Maybe<Scalars['Boolean']>;
  /**
   * The sheet this is on. Set only if the embedded object
   * is on its own sheet. Must be non-negative.
   */
  sheetId?: Maybe<Scalars['Int']>;
  /** The position at which the object is overlaid on top of a grid. */
  overlayPosition?: Maybe<OverlayPosition>;
};

/** The location an object is overlaid on top of a grid. */
export type OverlayPosition = {
  __typename?: 'OverlayPosition';
  /** The width of the object, in pixels. Defaults to 600. */
  widthPixels?: Maybe<Scalars['Int']>;
  /**
   * The horizontal offset, in pixels, that the object is offset
   * from the anchor cell.
   */
  offsetXPixels?: Maybe<Scalars['Int']>;
  /** The cell the object is anchored to. */
  anchorCell?: Maybe<GridCoordinate>;
  /**
   * The vertical offset, in pixels, that the object is offset
   * from the anchor cell.
   */
  offsetYPixels?: Maybe<Scalars['Int']>;
  /** The height of the object, in pixels. Defaults to 371. */
  heightPixels?: Maybe<Scalars['Int']>;
};

/**
 * A coordinate in a sheet.
 * All indexes are zero-based.
 */
export type GridCoordinate = {
  __typename?: 'GridCoordinate';
  /** The row index of the coordinate. */
  rowIndex?: Maybe<Scalars['Int']>;
  /** The column index of the coordinate. */
  columnIndex?: Maybe<Scalars['Int']>;
  /** The sheet this coordinate is on. */
  sheetId?: Maybe<Scalars['Int']>;
};

/** The specifications of a chart. */
export type ChartSpec = {
  __typename?: 'ChartSpec';
  /**
   * The subtitle text position.
   * This field is optional.
   */
  subtitleTextPosition?: Maybe<TextPosition>;
  /**
   * The background color of the entire chart.
   * Not applicable to Org charts.
   */
  backgroundColor?: Maybe<Color>;
  /**
   * A basic chart specification, can be one of many kinds of charts.
   * See BasicChartType for the list of all
   * charts this supports.
   */
  basicChart?: Maybe<BasicChartSpec>;
  /** An org chart specification. */
  orgChart?: Maybe<OrgChartSpec>;
  /** A pie chart specification. */
  pieChart?: Maybe<PieChartSpec>;
  /**
   * The title text format.
   * Strikethrough and underline are not supported.
   */
  titleTextFormat?: Maybe<TextFormat>;
  /** The title of the chart. */
  title?: Maybe<Scalars['String']>;
  /**
   * The alternative text that describes the chart.  This is often used
   * for accessibility.
   */
  altText?: Maybe<Scalars['String']>;
  /**
   * The title text position.
   * This field is optional.
   */
  titleTextPosition?: Maybe<TextPosition>;
  /** A histogram chart specification. */
  histogramChart?: Maybe<HistogramChartSpec>;
  /** A candlestick chart specification. */
  candlestickChart?: Maybe<CandlestickChartSpec>;
  /** A bubble chart specification. */
  bubbleChart?: Maybe<BubbleChartSpec>;
  /** A waterfall chart specification. */
  waterfallChart?: Maybe<WaterfallChartSpec>;
  /**
   * The name of the font to use by default for all chart text (e.g. title,
   * axis labels, legend).  If a font is specified for a specific part of the
   * chart it will override this font name.
   */
  fontName?: Maybe<Scalars['String']>;
  /** A treemap chart specification. */
  treemapChart?: Maybe<TreemapChartSpec>;
  /**
   * True to make a chart fill the entire space in which it's rendered with
   * minimum padding.  False to use the default padding.
   * (Not applicable to Geo and Org charts.)
   */
  maximized?: Maybe<Scalars['Boolean']>;
  /** Determines how the charts will use hidden rows or columns. */
  hiddenDimensionStrategy?: Maybe<Scalars['String']>;
  /**
   * The subtitle text format.
   * Strikethrough and underline are not supported.
   */
  subtitleTextFormat?: Maybe<TextFormat>;
  /** The subtitle of the chart. */
  subtitle?: Maybe<Scalars['String']>;
};

/** Position settings for text. */
export type TextPosition = {
  __typename?: 'TextPosition';
  /** Horizontal alignment setting for the piece of text. */
  horizontalAlignment?: Maybe<Scalars['String']>;
};

/**
 * The specification for a basic chart.  See BasicChartType for the list
 * of charts this supports.
 */
export type BasicChartSpec = {
  __typename?: 'BasicChartSpec';
  /** The type of the chart. */
  chartType?: Maybe<Scalars['String']>;
  /**
   * If some values in a series are missing, gaps may appear in the chart (e.g,
   * segments of lines in a line chart will be missing).  To eliminate these
   * gaps set this to true.
   * Applies to Line, Area, and Combo charts.
   */
  interpolateNulls?: Maybe<Scalars['Boolean']>;
  /** The data this chart is visualizing. */
  series?: Maybe<Array<Maybe<BasicChartSeries>>>;
  /** The position of the chart legend. */
  legendPosition?: Maybe<Scalars['String']>;
  /**
   * The behavior of tooltips and data highlighting when hovering on data and
   * chart area.
   */
  compareMode?: Maybe<Scalars['String']>;
  /**
   * The domain of data this is charting.
   * Only a single domain is supported.
   */
  domains?: Maybe<Array<Maybe<BasicChartDomain>>>;
  /**
   * Gets whether all lines should be rendered smooth or straight by default.
   * Applies to Line charts.
   */
  lineSmoothing?: Maybe<Scalars['Boolean']>;
  /**
   * The number of rows or columns in the data that are "headers".
   * If not set, Google Sheets will guess how many rows are headers based
   * on the data.
   *
   * (Note that BasicChartAxis.title may override the axis title
   *  inferred from the header values.)
   */
  headerCount?: Maybe<Scalars['Int']>;
  /**
   * The stacked type for charts that support vertical stacking.
   * Applies to Area, Bar, Column, Combo, and Stepped Area charts.
   */
  stackedType?: Maybe<Scalars['String']>;
  /** The axis on the chart. */
  axis?: Maybe<Array<Maybe<BasicChartAxis>>>;
  /**
   * True to make the chart 3D.
   * Applies to Bar and Column charts.
   */
  threeDimensional?: Maybe<Scalars['Boolean']>;
};

/**
 * A single series of data in a chart.
 * For example, if charting stock prices over time, multiple series may exist,
 * one for the "Open Price", "High Price", "Low Price" and "Close Price".
 */
export type BasicChartSeries = {
  __typename?: 'BasicChartSeries';
  /**
   * The color for elements (i.e. bars, lines, points) associated with this
   * series.  If empty, a default color is used.
   */
  color?: Maybe<Color>;
  /**
   * The line style of this series. Valid only if the
   * chartType is AREA,
   * LINE, or SCATTER.
   * COMBO charts are also supported if the
   * series chart type is
   * AREA or LINE.
   */
  lineStyle?: Maybe<LineStyle>;
  /** The data being visualized in this chart series. */
  series?: Maybe<ChartData>;
  /**
   * The type of this series. Valid only if the
   * chartType is
   * COMBO.
   * Different types will change the way the series is visualized.
   * Only LINE, AREA,
   * and COLUMN are supported.
   */
  type?: Maybe<Scalars['String']>;
  /**
   * The minor axis that will specify the range of values for this series.
   * For example, if charting stocks over time, the "Volume" series
   * may want to be pinned to the right with the prices pinned to the left,
   * because the scale of trading volume is different than the scale of
   * prices.
   * It is an error to specify an axis that isn't a valid minor axis
   * for the chart's type.
   */
  targetAxis?: Maybe<Scalars['String']>;
};

/** Properties that describe the style of a line. */
export type LineStyle = {
  __typename?: 'LineStyle';
  /** The dash type of the line. */
  type?: Maybe<Scalars['String']>;
  /** The thickness of the line, in px. */
  width?: Maybe<Scalars['Int']>;
};

/** The data included in a domain or series. */
export type ChartData = {
  __typename?: 'ChartData';
  /** The source ranges of the data. */
  sourceRange?: Maybe<ChartSourceRange>;
};

/** Source ranges for a chart. */
export type ChartSourceRange = {
  __typename?: 'ChartSourceRange';
  /**
   * The ranges of data for a series or domain.
   * Exactly one dimension must have a length of 1,
   * and all sources in the list must have the same dimension
   * with length 1.
   * The domain (if it exists) & all series must have the same number
   * of source ranges. If using more than one source range, then the source
   * range at a given offset must be in order and contiguous across the domain
   * and series.
   *
   * For example, these are valid configurations:
   *
   *     domain sources: A1:A5
   *     series1 sources: B1:B5
   *     series2 sources: D6:D10
   *
   *     domain sources: A1:A5, C10:C12
   *     series1 sources: B1:B5, D10:D12
   *     series2 sources: C1:C5, E10:E12
   */
  sources?: Maybe<Array<Maybe<GridRange>>>;
};

/**
 * The domain of a chart.
 * For example, if charting stock prices over time, this would be the date.
 */
export type BasicChartDomain = {
  __typename?: 'BasicChartDomain';
  /**
   * The data of the domain. For example, if charting stock prices over time,
   * this is the data representing the dates.
   */
  domain?: Maybe<ChartData>;
  /** True to reverse the order of the domain values (horizontal axis). */
  reversed?: Maybe<Scalars['Boolean']>;
};

/**
 * An axis of the chart.
 * A chart may not have more than one axis per
 * axis position.
 */
export type BasicChartAxis = {
  __typename?: 'BasicChartAxis';
  /** The position of this axis. */
  position?: Maybe<Scalars['String']>;
  /**
   * The title of this axis. If set, this overrides any title inferred
   * from headers of the data.
   */
  title?: Maybe<Scalars['String']>;
  /** The axis title text position. */
  titleTextPosition?: Maybe<TextPosition>;
  /**
   * The format of the title.
   * Only valid if the axis is not associated with the domain.
   */
  format?: Maybe<TextFormat>;
};

/**
 * The format of a run of text in a cell.
 * Absent values indicate that the field isn't specified.
 */
export type TextFormat = {
  __typename?: 'TextFormat';
  /** The font family. */
  fontFamily?: Maybe<Scalars['String']>;
  /** True if the text is italicized. */
  italic?: Maybe<Scalars['Boolean']>;
  /** True if the text has a strikethrough. */
  strikethrough?: Maybe<Scalars['Boolean']>;
  /** The size of the font. */
  fontSize?: Maybe<Scalars['Int']>;
  /** True if the text is underlined. */
  underline?: Maybe<Scalars['Boolean']>;
  /** The foreground color of the text. */
  foregroundColor?: Maybe<Color>;
  /** True if the text is bold. */
  bold?: Maybe<Scalars['Boolean']>;
};

/**
 * An <a href="/chart/interactive/docs/gallery/orgchart">org chart</a>.
 * Org charts require a unique set of labels in labels and may
 * optionally include parent_labels and tooltips.
 * parent_labels contain, for each node, the label identifying the parent
 * node.  tooltips contain, for each node, an optional tooltip.
 *
 * For example, to describe an OrgChart with Alice as the CEO, Bob as the
 * President (reporting to Alice) and Cathy as VP of Sales (also reporting to
 * Alice), have labels contain "Alice", "Bob", "Cathy",
 * parent_labels contain "", "Alice", "Alice" and tooltips contain
 * "CEO", "President", "VP Sales".
 */
export type OrgChartSpec = {
  __typename?: 'OrgChartSpec';
  /**
   * The data containing the label of the parent for the corresponding node.
   * A blank value indicates that the node has no parent and is a top-level
   * node.
   * This field is optional.
   */
  parentLabels?: Maybe<ChartData>;
  /** The size of the org chart nodes. */
  nodeSize?: Maybe<Scalars['String']>;
  /**
   * The data containing the labels for all the nodes in the chart.  Labels
   * must be unique.
   */
  labels?: Maybe<ChartData>;
  /** The color of the org chart nodes. */
  nodeColor?: Maybe<Color>;
  /**
   * The data containing the tooltip for the corresponding node.  A blank value
   * results in no tooltip being displayed for the node.
   * This field is optional.
   */
  tooltips?: Maybe<ChartData>;
  /** The color of the selected org chart nodes. */
  selectedNodeColor?: Maybe<Color>;
};

/** A <a href="/chart/interactive/docs/gallery/piechart">pie chart</a>. */
export type PieChartSpec = {
  __typename?: 'PieChartSpec';
  /** The data that covers the domain of the pie chart. */
  domain?: Maybe<ChartData>;
  /** True if the pie is three dimensional. */
  threeDimensional?: Maybe<Scalars['Boolean']>;
  /** The data that covers the one and only series of the pie chart. */
  series?: Maybe<ChartData>;
  /** Where the legend of the pie chart should be drawn. */
  legendPosition?: Maybe<Scalars['String']>;
  /** The size of the hole in the pie chart. */
  pieHole?: Maybe<Scalars['Int']>;
};

/**
 * A <a href="/chart/interactive/docs/gallery/histogram">histogram chart</a>.
 * A histogram chart groups data items into bins, displaying each bin as a
 * column of stacked items.  Histograms are used to display the distribution
 * of a dataset.  Each column of items represents a range into which those
 * items fall.  The number of bins can be chosen automatically or specified
 * explicitly.
 */
export type HistogramChartSpec = {
  __typename?: 'HistogramChartSpec';
  /**
   * The outlier percentile is used to ensure that outliers do not adversely
   * affect the calculation of bucket sizes.  For example, setting an outlier
   * percentile of 0.05 indicates that the top and bottom 5% of values when
   * calculating buckets.  The values are still included in the chart, they will
   * be added to the first or last buckets instead of their own buckets.
   * Must be between 0.0 and 0.5.
   */
  outlierPercentile?: Maybe<Scalars['Int']>;
  /**
   * Whether horizontal divider lines should be displayed between items in each
   * column.
   */
  showItemDividers?: Maybe<Scalars['Boolean']>;
  /**
   * The series for a histogram may be either a single series of values to be
   * bucketed or multiple series, each of the same length, containing the name
   * of the series followed by the values to be bucketed for that series.
   */
  series?: Maybe<Array<Maybe<HistogramSeries>>>;
  /** The position of the chart legend. */
  legendPosition?: Maybe<Scalars['String']>;
  /**
   * By default the bucket size (the range of values stacked in a single
   * column) is chosen automatically, but it may be overridden here.
   * E.g., A bucket size of 1.5 results in buckets from 0 - 1.5, 1.5 - 3.0, etc.
   * Cannot be negative.
   * This field is optional.
   */
  bucketSize?: Maybe<Scalars['Int']>;
};

/** A histogram series containing the series color and data. */
export type HistogramSeries = {
  __typename?: 'HistogramSeries';
  /**
   * The color of the column representing this series in each bucket.
   * This field is optional.
   */
  barColor?: Maybe<Color>;
  /** The data for this histogram series. */
  data?: Maybe<ChartData>;
};

/**
 * A <a href="/chart/interactive/docs/gallery/candlestickchart">candlestick
 * chart</a>.
 */
export type CandlestickChartSpec = {
  __typename?: 'CandlestickChartSpec';
  /**
   * The domain data (horizontal axis) for the candlestick chart.  String data
   * will be treated as discrete labels, other data will be treated as
   * continuous values.
   */
  domain?: Maybe<CandlestickDomain>;
  /**
   * The Candlestick chart data.
   * Only one CandlestickData is supported.
   */
  data?: Maybe<Array<Maybe<CandlestickData>>>;
};

/** The domain of a CandlestickChart. */
export type CandlestickDomain = {
  __typename?: 'CandlestickDomain';
  /** The data of the CandlestickDomain. */
  data?: Maybe<ChartData>;
  /** True to reverse the order of the domain values (horizontal axis). */
  reversed?: Maybe<Scalars['Boolean']>;
};

/**
 * The Candlestick chart data, each containing the low, open, close, and high
 * values for a series.
 */
export type CandlestickData = {
  __typename?: 'CandlestickData';
  /**
   * The range data (vertical axis) for the open/initial value for each
   * candle. This is the bottom of the candle body.  If less than the close
   * value the candle will be filled.  Otherwise the candle will be hollow.
   */
  openSeries?: Maybe<CandlestickSeries>;
  /**
   * The range data (vertical axis) for the high/maximum value for each
   * candle. This is the top of the candle's center line.
   */
  highSeries?: Maybe<CandlestickSeries>;
  /**
   * The range data (vertical axis) for the low/minimum value for each candle.
   * This is the bottom of the candle's center line.
   */
  lowSeries?: Maybe<CandlestickSeries>;
  /**
   * The range data (vertical axis) for the close/final value for each candle.
   * This is the top of the candle body.  If greater than the open value the
   * candle will be filled.  Otherwise the candle will be hollow.
   */
  closeSeries?: Maybe<CandlestickSeries>;
};

/** The series of a CandlestickData. */
export type CandlestickSeries = {
  __typename?: 'CandlestickSeries';
  /** The data of the CandlestickSeries. */
  data?: Maybe<ChartData>;
};

/** A <a href="/chart/interactive/docs/gallery/bubblechart">bubble chart</a>. */
export type BubbleChartSpec = {
  __typename?: 'BubbleChartSpec';
  /**
   * The minimum radius size of the bubbles, in pixels.
   * If specific, the field must be a positive value.
   */
  bubbleMinRadiusSize?: Maybe<Scalars['Int']>;
  /**
   * The max radius size of the bubbles, in pixels.
   * If specified, the field must be a positive value.
   */
  bubbleMaxRadiusSize?: Maybe<Scalars['Int']>;
  /**
   * The data contianing the bubble y-values.  These values locate the bubbles
   * in the chart vertically.
   */
  series?: Maybe<ChartData>;
  /** Where the legend of the chart should be drawn. */
  legendPosition?: Maybe<Scalars['String']>;
  /**
   * The data containing the bubble x-values.  These values locate the bubbles
   * in the chart horizontally.
   */
  domain?: Maybe<ChartData>;
  /**
   * The data contianing the bubble sizes.  Bubble sizes are used to draw
   * the bubbles at different sizes relative to each other.
   * If specified, group_ids must also be specified.  This field is
   * optional.
   */
  bubbleSizes?: Maybe<ChartData>;
  /**
   * The opacity of the bubbles between 0 and 1.0.
   * 0 is fully transparent and 1 is fully opaque.
   */
  bubbleOpacity?: Maybe<Scalars['Int']>;
  /** The bubble border color. */
  bubbleBorderColor?: Maybe<Color>;
  /**
   * The format of the text inside the bubbles.
   * Underline and Strikethrough are not supported.
   */
  bubbleTextStyle?: Maybe<TextFormat>;
  /**
   * The data containing the bubble group IDs. All bubbles with the same group
   * ID are drawn in the same color. If bubble_sizes is specified then
   * this field must also be specified but may contain blank values.
   * This field is optional.
   */
  groupIds?: Maybe<ChartData>;
  /** The data containing the bubble labels.  These do not need to be unique. */
  bubbleLabels?: Maybe<ChartData>;
};

/** A waterfall chart. */
export type WaterfallChartSpec = {
  __typename?: 'WaterfallChartSpec';
  /** The line style for the connector lines. */
  connectorLineStyle?: Maybe<LineStyle>;
  /** The domain data (horizontal axis) for the waterfall chart. */
  domain?: Maybe<WaterfallChartDomain>;
  /** True to interpret the first value as a total. */
  firstValueIsTotal?: Maybe<Scalars['Boolean']>;
  /** The stacked type. */
  stackedType?: Maybe<Scalars['String']>;
  /** True to hide connector lines between columns. */
  hideConnectorLines?: Maybe<Scalars['Boolean']>;
  /** The data this waterfall chart is visualizing. */
  series?: Maybe<Array<Maybe<WaterfallChartSeries>>>;
};

/** The domain of a waterfall chart. */
export type WaterfallChartDomain = {
  __typename?: 'WaterfallChartDomain';
  /** The data of the WaterfallChartDomain. */
  data?: Maybe<ChartData>;
  /** True to reverse the order of the domain values (horizontal axis). */
  reversed?: Maybe<Scalars['Boolean']>;
};

/** A single series of data for a waterfall chart. */
export type WaterfallChartSeries = {
  __typename?: 'WaterfallChartSeries';
  /** Styles for all columns in this series with positive values. */
  positiveColumnsStyle?: Maybe<WaterfallChartColumnStyle>;
  /**
   * True to hide the subtotal column from the end of the series. By default,
   * a subtotal column will appear at the end of each series. Setting this
   * field to true will hide that subtotal column for this series.
   */
  hideTrailingSubtotal?: Maybe<Scalars['Boolean']>;
  /** The data being visualized in this series. */
  data?: Maybe<ChartData>;
  /** Styles for all columns in this series with negative values. */
  negativeColumnsStyle?: Maybe<WaterfallChartColumnStyle>;
  /**
   * Custom subtotal columns appearing in this series. The order in which
   * subtotals are defined is not significant. Only one subtotal may be
   * defined for each data point.
   */
  customSubtotals?: Maybe<Array<Maybe<WaterfallChartCustomSubtotal>>>;
  /** Styles for all subtotal columns in this series. */
  subtotalColumnsStyle?: Maybe<WaterfallChartColumnStyle>;
};

/** Styles for a waterfall chart column. */
export type WaterfallChartColumnStyle = {
  __typename?: 'WaterfallChartColumnStyle';
  /** The color of the column. */
  color?: Maybe<Color>;
  /** The label of the column's legend. */
  label?: Maybe<Scalars['String']>;
};

/** A custom subtotal column for a waterfall chart series. */
export type WaterfallChartCustomSubtotal = {
  __typename?: 'WaterfallChartCustomSubtotal';
  /** A label for the subtotal column. */
  label?: Maybe<Scalars['String']>;
  /**
   * The 0-based index of a data point within the series. If
   * data_is_subtotal is true, the data point at this index is the
   * subtotal. Otherwise, the subtotal appears after the data point with
   * this index. A series can have multiple subtotals at arbitrary indices,
   * but subtotals do not affect the indices of the data points. For
   * example, if a series has three data points, their indices will always
   * be 0, 1, and 2, regardless of how many subtotals exist on the series or
   * what data points they are associated with.
   */
  subtotalIndex?: Maybe<Scalars['Int']>;
  /**
   * True if the data point at subtotal_index is the subtotal. If false,
   * the subtotal will be computed and appear after the data point.
   */
  dataIsSubtotal?: Maybe<Scalars['Boolean']>;
};

/** A <a href="/chart/interactive/docs/gallery/treemap">Treemap chart</a>. */
export type TreemapChartSpec = {
  __typename?: 'TreemapChartSpec';
  /** The text format for all labels on the chart. */
  textFormat?: Maybe<TextFormat>;
  /** The data the contains the treemap cells' parent labels. */
  parentLabels?: Maybe<ChartData>;
  /** The background color for header cells. */
  headerColor?: Maybe<Color>;
  /** The data that contains the treemap cell labels. */
  labels?: Maybe<ChartData>;
  /**
   * The data that determines the background color of each treemap data cell.
   * This field is optional. If not specified, size_data is used to
   * determine background colors. If specified, the data is expected to be
   * numeric. color_scale will determine how the values in this data map to
   * data cell background colors.
   */
  colorData?: Maybe<ChartData>;
  /**
   * The maximum possible data value. Cells with values greater than this will
   * have the same color as cells with this value. If not specified, defaults
   * to the actual maximum value from color_data, or the maximum value from
   * size_data if color_data is not specified.
   */
  maxValue?: Maybe<Scalars['Int']>;
  /**
   * The color scale for data cells in the treemap chart. Data cells are
   * assigned colors based on their color values. These color values come from
   * color_data, or from size_data if color_data is not specified.
   * Cells with color values less than or equal to min_value will
   * have minValueColor as their
   * background color. Cells with color values greater than or equal to
   * max_value will have
   * maxValueColor as their background
   * color. Cells with color values between min_value and max_value will
   * have background colors on a gradient between
   * minValueColor and
   * maxValueColor, the midpoint of
   * the gradient being midValueColor.
   * Cells with missing or non-numeric color values will have
   * noDataColor as their background
   * color.
   */
  colorScale?: Maybe<TreemapChartColorScale>;
  /** True to hide tooltips. */
  hideTooltips?: Maybe<Scalars['Boolean']>;
  /**
   * The number of additional data levels beyond the labeled levels to be shown
   * on the treemap chart. These levels are not interactive and are shown
   * without their labels. Defaults to 0 if not specified.
   */
  hintedLevels?: Maybe<Scalars['Int']>;
  /**
   * The minimum possible data value. Cells with values less than this will
   * have the same color as cells with this value. If not specified, defaults
   * to the actual minimum value from color_data, or the minimum value from
   * size_data if color_data is not specified.
   */
  minValue?: Maybe<Scalars['Int']>;
  /**
   * The number of data levels to show on the treemap chart. These levels are
   * interactive and are shown with their labels. Defaults to 2 if not
   * specified.
   */
  levels?: Maybe<Scalars['Int']>;
  /**
   * The data that determines the size of each treemap data cell. This data is
   * expected to be numeric. The cells corresponding to non-numeric or missing
   * data will not be rendered. If color_data is not specified, this data
   * is used to determine data cell background colors as well.
   */
  sizeData?: Maybe<ChartData>;
};

/** A color scale for a treemap chart. */
export type TreemapChartColorScale = {
  __typename?: 'TreemapChartColorScale';
  /**
   * The background color for cells with a color value less than or equal to
   * minValue. Defaults to #dc3912 if not
   * specified.
   */
  minValueColor?: Maybe<Color>;
  /**
   * The background color for cells that have no color data associated with
   * them. Defaults to #000000 if not specified.
   */
  noDataColor?: Maybe<Color>;
  /**
   * The background color for cells with a color value at the midpoint between
   * minValue and
   * maxValue. Defaults to #efe6dc if not
   * specified.
   */
  midValueColor?: Maybe<Color>;
  /**
   * The background color for cells with a color value greater than or equal
   * to maxValue. Defaults to #109618 if not
   * specified.
   */
  maxValueColor?: Maybe<Color>;
};

/** A filter view. */
export type FilterView = {
  __typename?: 'FilterView';
  /** The ID of the filter view. */
  filterViewId?: Maybe<Scalars['Int']>;
  /** The name of the filter view. */
  title?: Maybe<Scalars['String']>;
  /**
   * The range this filter view covers.
   *
   * When writing, only one of range or named_range_id
   * may be set.
   */
  range?: Maybe<GridRange>;
  /**
   * The sort order per column. Later specifications are used when values
   * are equal in the earlier specifications.
   */
  sortSpecs?: Maybe<Array<Maybe<SortSpec>>>;
  /**
   * The named range this filter view is backed by, if any.
   *
   * When writing, only one of range or named_range_id
   * may be set.
   */
  namedRangeId?: Maybe<Scalars['String']>;
};

/**
 * A group over an interval of rows or columns on a sheet, which can contain or
 * be contained within other groups. A group can be collapsed or expanded as a
 * unit on the sheet.
 */
export type DimensionGroup = {
  __typename?: 'DimensionGroup';
  /**
   * This field is true if this group is collapsed. A collapsed group remains
   * collapsed if an overlapping group at a shallower depth is expanded.
   *
   * A true value does not imply that all dimensions within the group are
   * hidden, since a dimension's visibility can change independently from this
   * group property. However, when this property is updated, all dimensions
   * within it are set to hidden if this field is true, or set to visible if
   * this field is false.
   */
  collapsed?: Maybe<Scalars['Boolean']>;
  /** The range over which this group exists. */
  range?: Maybe<DimensionRange>;
  /**
   * The depth of the group, representing how many groups have a range that
   * wholly contains the range of this group.
   */
  depth?: Maybe<Scalars['Int']>;
};

/**
 * A range along a single dimension on a sheet.
 * All indexes are zero-based.
 * Indexes are half open: the start index is inclusive
 * and the end index is exclusive.
 * Missing indexes indicate the range is unbounded on that side.
 */
export type DimensionRange = {
  __typename?: 'DimensionRange';
  /** The dimension of the span. */
  dimension?: Maybe<Scalars['String']>;
  /** The start (inclusive) of the span, or not set if unbounded. */
  startIndex?: Maybe<Scalars['Int']>;
  /** The end (exclusive) of the span, or not set if unbounded. */
  endIndex?: Maybe<Scalars['Int']>;
  /** The sheet this span is on. */
  sheetId?: Maybe<Scalars['Int']>;
};

/** Data in the grid, as well as metadata about the dimensions. */
export type GridData = {
  __typename?: 'GridData';
  /**
   * The data in the grid, one entry per row,
   * starting with the row in startRow.
   * The values in RowData will correspond to columns starting
   * at start_column.
   */
  rowData?: Maybe<Array<Maybe<RowData>>>;
  /** The first row this GridData refers to, zero-based. */
  startRow?: Maybe<Scalars['Int']>;
  /**
   * Metadata about the requested columns in the grid, starting with the column
   * in start_column.
   */
  columnMetadata?: Maybe<Array<Maybe<DimensionProperties>>>;
  /** The first column this GridData refers to, zero-based. */
  startColumn?: Maybe<Scalars['Int']>;
  /**
   * Metadata about the requested rows in the grid, starting with the row
   * in start_row.
   */
  rowMetadata?: Maybe<Array<Maybe<DimensionProperties>>>;
};

/** Data about each cell in a row. */
export type RowData = {
  __typename?: 'RowData';
  /** The values in the row, one per column. */
  values?: Maybe<Array<Maybe<CellData>>>;
};

/** Data about a specific cell. */
export type CellData = {
  __typename?: 'CellData';
  /**
   * A pivot table anchored at this cell. The size of pivot table itself
   * is computed dynamically based on its data, grouping, filters, values,
   * etc. Only the top-left cell of the pivot table contains the pivot table
   * definition. The other cells will contain the calculated values of the
   * results of the pivot in their effective_value fields.
   */
  pivotTable?: Maybe<PivotTable>;
  /**
   * The format the user entered for the cell.
   *
   * When writing, the new format will be merged with the existing format.
   */
  userEnteredFormat?: Maybe<CellFormat>;
  /** Any note on the cell. */
  note?: Maybe<Scalars['String']>;
  /**
   * The effective format being used by the cell.
   * This includes the results of applying any conditional formatting and,
   * if the cell contains a formula, the computed number format.
   * If the effective format is the default format, effective format will
   * not be written.
   * This field is read-only.
   */
  effectiveFormat?: Maybe<CellFormat>;
  /**
   * The value the user entered in the cell. e.g, `1234`, `'Hello'`, or `=NOW()`
   * Note: Dates, Times and DateTimes are represented as doubles in
   * serial number format.
   */
  userEnteredValue?: Maybe<ExtendedValue>;
  /**
   * A data validation rule on the cell, if any.
   *
   * When writing, the new data validation rule will overwrite any prior rule.
   */
  dataValidation?: Maybe<DataValidationRule>;
  /**
   * The effective value of the cell. For cells with formulas, this is
   * the calculated value.  For cells with literals, this is
   * the same as the user_entered_value.
   * This field is read-only.
   */
  effectiveValue?: Maybe<ExtendedValue>;
  /**
   * The formatted value of the cell.
   * This is the value as it's shown to the user.
   * This field is read-only.
   */
  formattedValue?: Maybe<Scalars['String']>;
  /**
   * Runs of rich text applied to subsections of the cell.  Runs are only valid
   * on user entered strings, not formulas, bools, or numbers.
   * Runs start at specific indexes in the text and continue until the next
   * run. Properties of a run will continue unless explicitly changed
   * in a subsequent run (and properties of the first run will continue
   * the properties of the cell unless explicitly changed).
   *
   * When writing, the new runs will overwrite any prior runs.  When writing a
   * new user_entered_value, previous runs are erased.
   */
  textFormatRuns?: Maybe<Array<Maybe<TextFormatRun>>>;
  /**
   * A hyperlink this cell points to, if any.
   * This field is read-only.  (To set it, use a `=HYPERLINK` formula
   * in the userEnteredValue.formulaValue
   * field.)
   */
  hyperlink?: Maybe<Scalars['String']>;
};

/** A pivot table. */
export type PivotTable = {
  __typename?: 'PivotTable';
  /** A list of values to include in the pivot table. */
  values?: Maybe<Array<Maybe<PivotValue>>>;
  /** The range the pivot table is reading data from. */
  source?: Maybe<GridRange>;
  /** Each column grouping in the pivot table. */
  columns?: Maybe<Array<Maybe<PivotGroup>>>;
  /** Each row grouping in the pivot table. */
  rows?: Maybe<Array<Maybe<PivotGroup>>>;
  /**
   * Whether values should be listed horizontally (as columns)
   * or vertically (as rows).
   */
  valueLayout?: Maybe<Scalars['String']>;
};

/** The definition of how a value in a pivot table should be calculated. */
export type PivotValue = {
  __typename?: 'PivotValue';
  /**
   * The column offset of the source range that this value reads from.
   *
   * For example, if the source was `C10:E15`, a `sourceColumnOffset` of `0`
   * means this value refers to column `C`, whereas the offset `1` would
   * refer to column `D`.
   */
  sourceColumnOffset?: Maybe<Scalars['Int']>;
  /** A name to use for the value. */
  name?: Maybe<Scalars['String']>;
  /**
   * A custom formula to calculate the value.  The formula must start
   * with an `=` character.
   */
  formula?: Maybe<Scalars['String']>;
  /**
   * If specified, indicates that pivot values should be displayed as
   * the result of a calculation with another pivot value. For example, if
   * calculated_display_type is specified as PERCENT_OF_GRAND_TOTAL, all the
   * pivot values are displayed as the percentage of the grand total. In
   * the Sheets UI, this is referred to as "Show As" in the value section of a
   * pivot table.
   */
  calculatedDisplayType?: Maybe<Scalars['String']>;
  /**
   * A function to summarize the value.
   * If formula is set, the only supported values are
   * SUM and
   * CUSTOM.
   * If sourceColumnOffset is set, then `CUSTOM`
   * is not supported.
   */
  summarizeFunction?: Maybe<Scalars['String']>;
};

/** A single grouping (either row or column) in a pivot table. */
export type PivotGroup = {
  __typename?: 'PivotGroup';
  /** The group rule to apply to this row/column group. */
  groupRule?: Maybe<PivotGroupRule>;
  /**
   * The labels to use for the row/column groups which can be customized. For
   * example, in the following pivot table, the row label is `Region` (which
   * could be renamed to `State`) and the column label is `Product` (which
   * could be renamed `Item`). Pivot tables created before December 2017 do
   * not have header labels. If you'd like to add header labels to an existing
   * pivot table, please delete the existing pivot table and then create a new
   * pivot table with same parameters.
   *
   *     +--------------+---------+-------+
   *     | SUM of Units | Product |       |
   *     | Region       | Pen     | Paper |
   *     +--------------+---------+-------+
   *     | New York     |     345 |    98 |
   *     | Oregon       |     234 |   123 |
   *     | Tennessee    |     531 |   415 |
   *     +--------------+---------+-------+
   *     | Grand Total  |    1110 |   636 |
   *     +--------------+---------+-------+
   */
  label?: Maybe<Scalars['String']>;
  /**
   * True if the headings in this pivot group should be repeated.
   * This is only valid for row groupings and is ignored by columns.
   *
   * By default, we minimize repitition of headings by not showing higher
   * level headings where they are the same. For example, even though the
   * third row below corresponds to "Q1 Mar", "Q1" is not shown because
   * it is redundant with previous rows. Setting repeat_headings to true
   * would cause "Q1" to be repeated for "Feb" and "Mar".
   *
   *     +--------------+
   *     | Q1     | Jan |
   *     |        | Feb |
   *     |        | Mar |
   *     +--------+-----+
   *     | Q1 Total     |
   *     +--------------+
   */
  repeatHeadings?: Maybe<Scalars['Boolean']>;
  /**
   * The column offset of the source range that this grouping is based on.
   *
   * For example, if the source was `C10:E15`, a `sourceColumnOffset` of `0`
   * means this group refers to column `C`, whereas the offset `1` would refer
   * to column `D`.
   */
  sourceColumnOffset?: Maybe<Scalars['Int']>;
  /** The order the values in this group should be sorted. */
  sortOrder?: Maybe<Scalars['String']>;
  /**
   * The bucket of the opposite pivot group to sort by.
   * If not specified, sorting is alphabetical by this group's values.
   */
  valueBucket?: Maybe<PivotGroupSortValueBucket>;
  /** True if the pivot table should include the totals for this grouping. */
  showTotals?: Maybe<Scalars['Boolean']>;
  /** Metadata about values in the grouping. */
  valueMetadata?: Maybe<Array<Maybe<PivotGroupValueMetadata>>>;
};

/**
 * An optional setting on a PivotGroup that defines buckets for the values
 * in the source data column rather than breaking out each individual value.
 * Only one PivotGroup with a group rule may be added for each column in
 * the source data, though on any given column you may add both a
 * PivotGroup that has a rule and a PivotGroup that does not.
 */
export type PivotGroupRule = {
  __typename?: 'PivotGroupRule';
  /** A HistogramRule. */
  histogramRule?: Maybe<HistogramRule>;
  /** A DateTimeRule. */
  dateTimeRule?: Maybe<DateTimeRule>;
  /** A ManualRule. */
  manualRule?: Maybe<ManualRule>;
};

/**
 * Allows you to organize the numeric values in a source data column into
 * buckets of a constant size. All values from HistogramRule.start to
 * HistogramRule.end are placed into groups of size
 * HistogramRule.interval. In addition, all values below
 * HistogramRule.start are placed in one group, and all values above
 * HistogramRule.end are placed in another. Only
 * HistogramRule.interval is required, though if HistogramRule.start
 * and HistogramRule.end are both provided, HistogramRule.start must
 * be less than HistogramRule.end. For example, a pivot table showing
 * average purchase amount by age that has 50+ rows:
 *
 *     +-----+-------------------+
 *     | Age | AVERAGE of Amount |
 *     +-----+-------------------+
 *     | 16  |            $27.13 |
 *     | 17  |             $5.24 |
 *     | 18  |            $20.15 |
 *     ...
 *     +-----+-------------------+
 * could be turned into a pivot table that looks like the one below by
 * applying a histogram group rule with a HistogramRule.start of 25,
 * an HistogramRule.interval of 20, and an HistogramRule.end
 * of 65.
 *
 *     +-------------+-------------------+
 *     | Grouped Age | AVERAGE of Amount |
 *     +-------------+-------------------+
 *     | < 25        |            $19.34 |
 *     | 25-45       |            $31.43 |
 *     | 45-65       |            $35.87 |
 *     | > 65        |            $27.55 |
 *     +-------------+-------------------+
 *     | Grand Total |            $29.12 |
 *     +-------------+-------------------+
 */
export type HistogramRule = {
  __typename?: 'HistogramRule';
  /**
   * The maximum value at which items are placed into buckets
   * of constant size. Values above end are lumped into a single bucket.
   * This field is optional.
   */
  end?: Maybe<Scalars['Int']>;
  /** The size of the buckets that are created. Must be positive. */
  interval?: Maybe<Scalars['Int']>;
  /**
   * The minimum value at which items are placed into buckets
   * of constant size. Values below start are lumped into a single bucket.
   * This field is optional.
   */
  start?: Maybe<Scalars['Int']>;
};

/**
 * Allows you to organize the date-time values in a source data column into
 * buckets based on selected parts of their date or time values. For example,
 * consider a pivot table showing sales transactions by date:
 *
 *     +----------+--------------+
 *     | Date     | SUM of Sales |
 *     +----------+--------------+
 *     | 1/1/2017 |      $621.14 |
 *     | 2/3/2017 |      $708.84 |
 *     | 5/8/2017 |      $326.84 |
 *     ...
 *     +----------+--------------+
 * Applying a date-time group rule with a DateTimeRuleType of YEAR_MONTH
 * results in the following pivot table.
 *
 *     +--------------+--------------+
 *     | Grouped Date | SUM of Sales |
 *     +--------------+--------------+
 *     | 2017-Jan     |   $53,731.78 |
 *     | 2017-Feb     |   $83,475.32 |
 *     | 2017-Mar     |   $94,385.05 |
 *     ...
 *     +--------------+--------------+
 */
export type DateTimeRule = {
  __typename?: 'DateTimeRule';
  /** The type of date-time grouping to apply. */
  type?: Maybe<Scalars['String']>;
};

/**
 * Allows you to manually organize the values in a source data column into
 * buckets with names of your choosing. For example, a pivot table that
 * aggregates population by state:
 *
 *     +-------+-------------------+
 *     | State | SUM of Population |
 *     +-------+-------------------+
 *     | AK    |               0.7 |
 *     | AL    |               4.8 |
 *     | AR    |               2.9 |
 *     ...
 *     +-------+-------------------+
 * could be turned into a pivot table that aggregates population by time zone
 * by providing a list of groups (for example, groupName = 'Central',
 * items = ['AL', 'AR', 'IA', ...]) to a manual group rule.
 * Note that a similar effect could be achieved by adding a time zone column
 * to the source data and adjusting the pivot table.
 *
 *     +-----------+-------------------+
 *     | Time Zone | SUM of Population |
 *     +-----------+-------------------+
 *     | Central   |             106.3 |
 *     | Eastern   |             151.9 |
 *     | Mountain  |              17.4 |
 *     ...
 *     +-----------+-------------------+
 */
export type ManualRule = {
  __typename?: 'ManualRule';
  /**
   * The list of group names and the corresponding items from the source data
   * that map to each group name.
   */
  groups?: Maybe<Array<Maybe<ManualRuleGroup>>>;
};

/**
 * A group name and a list of items from the source data that should be placed
 * in the group with this name.
 */
export type ManualRuleGroup = {
  __typename?: 'ManualRuleGroup';
  /**
   * The items in the source data that should be placed into this group. Each
   * item may be a string, number, or boolean. Items may appear in at most one
   * group within a given ManualRule. Items that do not appear in any
   * group will appear on their own.
   */
  items?: Maybe<Array<Maybe<ExtendedValue>>>;
  /**
   * The group name, which must be a string. Each group in a given
   * ManualRule must have a unique group name.
   */
  groupName?: Maybe<ExtendedValue>;
};

/** The kinds of value that a cell in a spreadsheet can have. */
export type ExtendedValue = {
  __typename?: 'ExtendedValue';
  /**
   * Represents a string value.
   * Leading single quotes are not included. For example, if the user typed
   * `'123` into the UI, this would be represented as a `stringValue` of
   * `"123"`.
   */
  stringValue?: Maybe<Scalars['String']>;
  /** Represents a boolean value. */
  boolValue?: Maybe<Scalars['Boolean']>;
  /** Represents a formula. */
  formulaValue?: Maybe<Scalars['String']>;
  /**
   * Represents a double value.
   * Note: Dates, Times and DateTimes are represented as doubles in
   * "serial number" format.
   */
  numberValue?: Maybe<Scalars['Int']>;
  /**
   * Represents an error.
   * This field is read-only.
   */
  errorValue?: Maybe<ErrorValue>;
};

/** An error in a cell. */
export type ErrorValue = {
  __typename?: 'ErrorValue';
  /** The type of error. */
  type?: Maybe<Scalars['String']>;
  /**
   * A message with more information about the error
   * (in the spreadsheet's locale).
   */
  message?: Maybe<Scalars['String']>;
};

/** Information about which values in a pivot group should be used for sorting. */
export type PivotGroupSortValueBucket = {
  __typename?: 'PivotGroupSortValueBucket';
  /**
   * Determines the bucket from which values are chosen to sort.
   *
   * For example, in a pivot table with one row group & two column groups,
   * the row group can list up to two values. The first value corresponds
   * to a value within the first column group, and the second value
   * corresponds to a value in the second column group.  If no values
   * are listed, this would indicate that the row should be sorted according
   * to the "Grand Total" over the column groups. If a single value is listed,
   * this would correspond to using the "Total" of that bucket.
   */
  buckets?: Maybe<Array<Maybe<ExtendedValue>>>;
  /**
   * The offset in the PivotTable.values list which the values in this
   * grouping should be sorted by.
   */
  valuesIndex?: Maybe<Scalars['Int']>;
};

/** Metadata about a value in a pivot grouping. */
export type PivotGroupValueMetadata = {
  __typename?: 'PivotGroupValueMetadata';
  /**
   * The calculated value the metadata corresponds to.
   * (Note that formulaValue is not valid,
   *  because the values will be calculated.)
   */
  value?: Maybe<ExtendedValue>;
  /** True if the data corresponding to the value is collapsed. */
  collapsed?: Maybe<Scalars['Boolean']>;
};

/** The format of a cell. */
export type CellFormat = {
  __typename?: 'CellFormat';
  /** The borders of the cell. */
  borders?: Maybe<Borders>;
  /** The direction of the text in the cell. */
  textDirection?: Maybe<Scalars['String']>;
  /** The wrap strategy for the value in the cell. */
  wrapStrategy?: Maybe<Scalars['String']>;
  /** The rotation applied to text in a cell */
  textRotation?: Maybe<TextRotation>;
  /** A format describing how number values should be represented to the user. */
  numberFormat?: Maybe<NumberFormat>;
  /** How a hyperlink, if it exists, should be displayed in the cell. */
  hyperlinkDisplayType?: Maybe<Scalars['String']>;
  /** The horizontal alignment of the value in the cell. */
  horizontalAlignment?: Maybe<Scalars['String']>;
  /** The format of the text in the cell (unless overridden by a format run). */
  textFormat?: Maybe<TextFormat>;
  /** The background color of the cell. */
  backgroundColor?: Maybe<Color>;
  /** The padding of the cell. */
  padding?: Maybe<Padding>;
  /** The vertical alignment of the value in the cell. */
  verticalAlignment?: Maybe<Scalars['String']>;
};

/** The borders of the cell. */
export type Borders = {
  __typename?: 'Borders';
  /** The right border of the cell. */
  right?: Maybe<Border>;
  /** The bottom border of the cell. */
  bottom?: Maybe<Border>;
  /** The top border of the cell. */
  top?: Maybe<Border>;
  /** The left border of the cell. */
  left?: Maybe<Border>;
};

/** A border along a cell. */
export type Border = {
  __typename?: 'Border';
  /** The color of the border. */
  color?: Maybe<Color>;
  /**
   * The width of the border, in pixels.
   * Deprecated; the width is determined by the "style" field.
   */
  width?: Maybe<Scalars['Int']>;
  /** The style of the border. */
  style?: Maybe<Scalars['String']>;
};

/** The rotation applied to text in a cell. */
export type TextRotation = {
  __typename?: 'TextRotation';
  /**
   * The angle between the standard orientation and the desired orientation.
   * Measured in degrees. Valid values are between -90 and 90. Positive
   * angles are angled upwards, negative are angled downwards.
   *
   * Note: For LTR text direction positive angles are in the
   * counterclockwise direction, whereas for RTL they are in the clockwise
   * direction
   */
  angle?: Maybe<Scalars['Int']>;
  /**
   * If true, text reads top to bottom, but the orientation of individual
   * characters is unchanged.
   * For example:
   *
   *     | V |
   *     | e |
   *     | r |
   *     | t |
   *     | i |
   *     | c |
   *     | a |
   *     | l |
   */
  vertical?: Maybe<Scalars['Boolean']>;
};

/** The number format of a cell. */
export type NumberFormat = {
  __typename?: 'NumberFormat';
  /**
   * The type of the number format.
   * When writing, this field must be set.
   */
  type?: Maybe<Scalars['String']>;
  /**
   * Pattern string used for formatting.  If not set, a default pattern based on
   * the user's locale will be used if necessary for the given type.
   * See the [Date and Number Formats guide](/sheets/api/guides/formats) for
   * more information about the supported patterns.
   */
  pattern?: Maybe<Scalars['String']>;
};

/**
 * The amount of padding around the cell, in pixels.
 * When updating padding, every field must be specified.
 */
export type Padding = {
  __typename?: 'Padding';
  /** The right padding of the cell. */
  right?: Maybe<Scalars['Int']>;
  /** The bottom padding of the cell. */
  bottom?: Maybe<Scalars['Int']>;
  /** The top padding of the cell. */
  top?: Maybe<Scalars['Int']>;
  /** The left padding of the cell. */
  left?: Maybe<Scalars['Int']>;
};

/** A data validation rule. */
export type DataValidationRule = {
  __typename?: 'DataValidationRule';
  /** The condition that data in the cell must match. */
  condition?: Maybe<BooleanCondition>;
  /**
   * True if the UI should be customized based on the kind of condition.
   * If true, "List" conditions will show a dropdown.
   */
  showCustomUi?: Maybe<Scalars['Boolean']>;
  /** True if invalid data should be rejected. */
  strict?: Maybe<Scalars['Boolean']>;
  /** A message to show the user when adding data to the cell. */
  inputMessage?: Maybe<Scalars['String']>;
};

/**
 * A condition that can evaluate to true or false.
 * BooleanConditions are used by conditional formatting,
 * data validation, and the criteria in filters.
 */
export type BooleanCondition = {
  __typename?: 'BooleanCondition';
  /** The type of condition. */
  type?: Maybe<Scalars['String']>;
  /**
   * The values of the condition. The number of supported values depends
   * on the condition type.  Some support zero values,
   * others one or two values,
   * and ConditionType.ONE_OF_LIST supports an arbitrary number of values.
   */
  values?: Maybe<Array<Maybe<ConditionValue>>>;
};

/** The value of the condition. */
export type ConditionValue = {
  __typename?: 'ConditionValue';
  /**
   * A relative date (based on the current date).
   * Valid only if the type is
   * DATE_BEFORE,
   * DATE_AFTER,
   * DATE_ON_OR_BEFORE or
   * DATE_ON_OR_AFTER.
   *
   * Relative dates are not supported in data validation.
   * They are supported only in conditional formatting and
   * conditional filters.
   */
  relativeDate?: Maybe<Scalars['String']>;
  /**
   * A value the condition is based on.
   * The value is parsed as if the user typed into a cell.
   * Formulas are supported (and must begin with an `=` or a '+').
   */
  userEnteredValue?: Maybe<Scalars['String']>;
};

/**
 * A run of a text format. The format of this run continues until the start
 * index of the next run.
 * When updating, all fields must be set.
 */
export type TextFormatRun = {
  __typename?: 'TextFormatRun';
  /** The character index where this run starts. */
  startIndex?: Maybe<Scalars['Int']>;
  /** The format of this run.  Absent values inherit the cell's format. */
  format?: Maybe<TextFormat>;
};

/** Properties about a dimension. */
export type DimensionProperties = {
  __typename?: 'DimensionProperties';
  /** The height (if a row) or width (if a column) of the dimension in pixels. */
  pixelSize?: Maybe<Scalars['Int']>;
  /**
   * True if this dimension is being filtered.
   * This field is read-only.
   */
  hiddenByFilter?: Maybe<Scalars['Boolean']>;
  /** True if this dimension is explicitly hidden. */
  hiddenByUser?: Maybe<Scalars['Boolean']>;
  /** The developer metadata associated with a single row or column. */
  developerMetadata?: Maybe<Array<Maybe<DeveloperMetadata>>>;
};

/**
 * Developer metadata associated with a location or object in a spreadsheet.
 * Developer metadata may be used to associate arbitrary data with various
 * parts of a spreadsheet and will remain associated at those locations as they
 * move around and the spreadsheet is edited.  For example, if developer
 * metadata is associated with row 5 and another row is then subsequently
 * inserted above row 5, that original metadata will still be associated with
 * the row it was first associated with (what is now row 6). If the associated
 * object is deleted its metadata is deleted too.
 */
export type DeveloperMetadata = {
  __typename?: 'DeveloperMetadata';
  /** Data associated with the metadata's key. */
  metadataValue?: Maybe<Scalars['String']>;
  /**
   * The metadata key. There may be multiple metadata in a spreadsheet with the
   * same key.  Developer metadata must always have a key specified.
   */
  metadataKey?: Maybe<Scalars['String']>;
  /**
   * The spreadsheet-scoped unique ID that identifies the metadata. IDs may be
   * specified when metadata is created, otherwise one will be randomly
   * generated and assigned. Must be positive.
   */
  metadataId?: Maybe<Scalars['Int']>;
  /** The location where the metadata is associated. */
  location?: Maybe<DeveloperMetadataLocation>;
  /**
   * The metadata visibility.  Developer metadata must always have a visibility
   * specified.
   */
  visibility?: Maybe<Scalars['String']>;
};

/** A location where metadata may be associated in a spreadsheet. */
export type DeveloperMetadataLocation = {
  __typename?: 'DeveloperMetadataLocation';
  /** True when metadata is associated with an entire spreadsheet. */
  spreadsheet?: Maybe<Scalars['Boolean']>;
  /** The ID of the sheet when metadata is associated with an entire sheet. */
  sheetId?: Maybe<Scalars['Int']>;
  /** The type of location this object represents.  This field is read-only. */
  locationType?: Maybe<Scalars['String']>;
  /**
   * Represents the row or column when metadata is associated with
   * a dimension. The specified DimensionRange must represent a single row
   * or column; it cannot be unbounded or span multiple rows or columns.
   */
  dimensionRange?: Maybe<DimensionRange>;
};

/** Properties of a sheet. */
export type SheetProperties = {
  __typename?: 'SheetProperties';
  /** The name of the sheet. */
  title?: Maybe<Scalars['String']>;
  /** The color of the tab in the UI. */
  tabColor?: Maybe<Color>;
  /**
   * The index of the sheet within the spreadsheet.
   * When adding or updating sheet properties, if this field
   * is excluded then the sheet is added or moved to the end
   * of the sheet list. When updating sheet indices or inserting
   * sheets, movement is considered in "before the move" indexes.
   * For example, if there were 3 sheets (S1, S2, S3) in order to
   * move S1 ahead of S2 the index would have to be set to 2. A sheet
   * index update request is ignored if the requested index is
   * identical to the sheets current index or if the requested new
   * index is equal to the current sheet index + 1.
   */
  index?: Maybe<Scalars['Int']>;
  /**
   * The ID of the sheet. Must be non-negative.
   * This field cannot be changed once set.
   */
  sheetId?: Maybe<Scalars['Int']>;
  /** True if the sheet is an RTL sheet instead of an LTR sheet. */
  rightToLeft?: Maybe<Scalars['Boolean']>;
  /** True if the sheet is hidden in the UI, false if it's visible. */
  hidden?: Maybe<Scalars['Boolean']>;
  /**
   * Additional properties of the sheet if this sheet is a grid.
   * (If the sheet is an object sheet, containing a chart or image, then
   * this field will be absent.)
   * When writing it is an error to set any grid properties on non-grid sheets.
   */
  gridProperties?: Maybe<GridProperties>;
  /**
   * The type of sheet. Defaults to GRID.
   * This field cannot be changed once set.
   */
  sheetType?: Maybe<Scalars['String']>;
};

/** Properties of a grid. */
export type GridProperties = {
  __typename?: 'GridProperties';
  /** The number of columns that are frozen in the grid. */
  frozenColumnCount?: Maybe<Scalars['Int']>;
  /** The number of columns in the grid. */
  columnCount?: Maybe<Scalars['Int']>;
  /** True if the column grouping control toggle is shown after the group. */
  columnGroupControlAfter?: Maybe<Scalars['Boolean']>;
  /** True if the row grouping control toggle is shown after the group. */
  rowGroupControlAfter?: Maybe<Scalars['Boolean']>;
  /** The number of rows in the grid. */
  rowCount?: Maybe<Scalars['Int']>;
  /** True if the grid isn't showing gridlines in the UI. */
  hideGridlines?: Maybe<Scalars['Boolean']>;
  /** The number of rows that are frozen in the grid. */
  frozenRowCount?: Maybe<Scalars['Int']>;
};

/** A protected range. */
export type ProtectedRange = {
  __typename?: 'ProtectedRange';
  /**
   * True if this protected range will show a warning when editing.
   * Warning-based protection means that every user can edit data in the
   * protected range, except editing will prompt a warning asking the user
   * to confirm the edit.
   *
   * When writing: if this field is true, then editors is ignored.
   * Additionally, if this field is changed from true to false and the
   * `editors` field is not set (nor included in the field mask), then
   * the editors will be set to all the editors in the document.
   */
  warningOnly?: Maybe<Scalars['Boolean']>;
  /**
   * True if the user who requested this protected range can edit the
   * protected area.
   * This field is read-only.
   */
  requestingUserCanEdit?: Maybe<Scalars['Boolean']>;
  /**
   * The users and groups with edit access to the protected range.
   * This field is only visible to users with edit access to the protected
   * range and the document.
   * Editors are not supported with warning_only protection.
   */
  editors?: Maybe<Editors>;
  /**
   * The range that is being protected.
   * The range may be fully unbounded, in which case this is considered
   * a protected sheet.
   *
   * When writing, only one of range or named_range_id
   * may be set.
   */
  range?: Maybe<GridRange>;
  /** The description of this protected range. */
  description?: Maybe<Scalars['String']>;
  /**
   * The list of unprotected ranges within a protected sheet.
   * Unprotected ranges are only supported on protected sheets.
   */
  unprotectedRanges?: Maybe<Array<Maybe<GridRange>>>;
  /**
   * The named range this protected range is backed by, if any.
   *
   * When writing, only one of range or named_range_id
   * may be set.
   */
  namedRangeId?: Maybe<Scalars['String']>;
  /**
   * The ID of the protected range.
   * This field is read-only.
   */
  protectedRangeId?: Maybe<Scalars['Int']>;
};

/** The editors of a protected range. */
export type Editors = {
  __typename?: 'Editors';
  /** The email addresses of users with edit access to the protected range. */
  users?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The email addresses of groups with edit access to the protected range. */
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * True if anyone in the document's domain has edit access to the protected
   * range.  Domain protection is only supported on documents within a domain.
   */
  domainUsersCanEdit?: Maybe<Scalars['Boolean']>;
};

/** A rule describing a conditional format. */
export type ConditionalFormatRule = {
  __typename?: 'ConditionalFormatRule';
  /**
   * The ranges that are formatted if the condition is true.
   * All the ranges must be on the same grid.
   */
  ranges?: Maybe<Array<Maybe<GridRange>>>;
  /** The formatting will vary based on the gradients in the rule. */
  gradientRule?: Maybe<GradientRule>;
  /** The formatting is either "on" or "off" according to the rule. */
  booleanRule?: Maybe<BooleanRule>;
};

/**
 * A rule that applies a gradient color scale format, based on
 * the interpolation points listed. The format of a cell will vary
 * based on its contents as compared to the values of the interpolation
 * points.
 */
export type GradientRule = {
  __typename?: 'GradientRule';
  /** An optional midway interpolation point. */
  midpoint?: Maybe<InterpolationPoint>;
  /** The starting interpolation point. */
  minpoint?: Maybe<InterpolationPoint>;
  /** The final interpolation point. */
  maxpoint?: Maybe<InterpolationPoint>;
};

/**
 * A single interpolation point on a gradient conditional format.
 * These pin the gradient color scale according to the color,
 * type and value chosen.
 */
export type InterpolationPoint = {
  __typename?: 'InterpolationPoint';
  /** The color this interpolation point should use. */
  color?: Maybe<Color>;
  /** How the value should be interpreted. */
  type?: Maybe<Scalars['String']>;
  /**
   * The value this interpolation point uses.  May be a formula.
   * Unused if type is MIN or
   * MAX.
   */
  value?: Maybe<Scalars['String']>;
};

/** A rule that may or may not match, depending on the condition. */
export type BooleanRule = {
  __typename?: 'BooleanRule';
  /**
   * The format to apply.
   * Conditional formatting can only apply a subset of formatting:
   * bold, italic,
   * strikethrough,
   * foreground color &
   * background color.
   */
  format?: Maybe<CellFormat>;
  /**
   * The condition of the rule. If the condition evaluates to true,
   * the format is applied.
   */
  condition?: Maybe<BooleanCondition>;
};

/** Properties of a spreadsheet. */
export type SpreadsheetProperties = {
  __typename?: 'SpreadsheetProperties';
  /**
   * Determines whether and how circular references are resolved with iterative
   * calculation.  Absence of this field means that circular references will
   * result in calculation errors.
   */
  iterativeCalculationSettings?: Maybe<IterativeCalculationSettings>;
  /**
   * The default format of all cells in the spreadsheet.
   * CellData.effectiveFormat will not be set if
   * the cell's format is equal to this default format. This field is read-only.
   */
  defaultFormat?: Maybe<CellFormat>;
  /** The amount of time to wait before volatile functions are recalculated. */
  autoRecalc?: Maybe<Scalars['String']>;
  /** The title of the spreadsheet. */
  title?: Maybe<Scalars['String']>;
  /**
   * The time zone of the spreadsheet, in CLDR format such as
   * `America/New_York`. If the time zone isn't recognized, this may
   * be a custom time zone such as `GMT-07:00`.
   */
  timeZone?: Maybe<Scalars['String']>;
  /**
   * The locale of the spreadsheet in one of the following formats:
   *
   * * an ISO 639-1 language code such as `en`
   *
   * * an ISO 639-2 language code such as `fil`, if no 639-1 code exists
   *
   * * a combination of the ISO language code and country code, such as `en_US`
   *
   * Note: when updating this field, not all locales/languages are supported.
   */
  locale?: Maybe<Scalars['String']>;
};

/**
 * Settings to control how circular dependencies are resolved with iterative
 * calculation.
 */
export type IterativeCalculationSettings = {
  __typename?: 'IterativeCalculationSettings';
  /**
   * When iterative calculation is enabled and successive results differ by
   * less than this threshold value, the calculation rounds stop.
   */
  convergenceThreshold?: Maybe<Scalars['Int']>;
  /**
   * When iterative calculation is enabled, the maximum number of calculation
   * rounds to perform.
   */
  maxIterations?: Maybe<Scalars['Int']>;
};

/** A named range. */
export type NamedRange = {
  __typename?: 'NamedRange';
  /** The name of the named range. */
  name?: Maybe<Scalars['String']>;
  /** The ID of the named range. */
  namedRangeId?: Maybe<Scalars['String']>;
  /** The range this represents. */
  range?: Maybe<GridRange>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type SheetDataQueryVariables = Exact<{
  token?: Maybe<Scalars['String']>;
  spreadsheetId: Scalars['String'];
  ranges?: Maybe<Scalars['String']>;
}>;


export type SheetDataQuery = (
  { __typename?: 'SheetsApiQuery' }
  & {
  SheetsApi?: Maybe<(
    { __typename?: 'SheetsResources' }
    & {
    spreadsheets?: Maybe<(
      { __typename?: 'Spreadsheets_' }
      & {
      get?: Maybe<(
        { __typename?: 'Spreadsheet' }
        & {
        properties?: Maybe<(
          { __typename?: 'SpreadsheetProperties' }
          & Pick<SpreadsheetProperties, 'title'>
          )>, sheets?: Maybe<Array<Maybe<(
          { __typename?: 'Sheet' }
          & {
          data?: Maybe<Array<Maybe<(
            { __typename?: 'GridData' }
            & {
            rowData?: Maybe<Array<Maybe<(
              { __typename?: 'RowData' }
              & {
              values?: Maybe<Array<Maybe<(
                { __typename?: 'CellData' }
                & {
                effectiveValue?: Maybe<(
                  { __typename?: 'ExtendedValue' }
                  & Pick<ExtendedValue, 'stringValue'>
                  )>
              }
                )>>>
            }
              )>>>
          }
            )>>>
        }
          )>>>
      }
        )>
    }
      )>
  }
    )>
}
  );

export type SheetMetaQueryVariables = Exact<{
  token?: Maybe<Scalars['String']>;
  spreadsheetId: Scalars['String'];
  ranges?: Maybe<Scalars['String']>;
}>;


export type SheetMetaQuery = (
  { __typename?: 'SheetsApiQuery' }
  & {
  SheetsApi?: Maybe<(
    { __typename?: 'SheetsResources' }
    & {
    spreadsheets?: Maybe<(
      { __typename?: 'Spreadsheets_' }
      & {
      get?: Maybe<(
        { __typename?: 'Spreadsheet' }
        & {
        properties?: Maybe<(
          { __typename?: 'SpreadsheetProperties' }
          & Pick<SpreadsheetProperties, 'title'>
          )>, sheets?: Maybe<Array<Maybe<(
          { __typename?: 'Sheet' }
          & {
          data?: Maybe<Array<Maybe<(
            { __typename?: 'GridData' }
            & {
            rowData?: Maybe<Array<Maybe<(
              { __typename?: 'RowData' }
              & {
              values?: Maybe<Array<Maybe<(
                { __typename?: 'CellData' }
                & Pick<CellData, 'formattedValue'>
                )>>>
            }
              )>>>
          }
            )>>>
        }
          )>>>
      }
        )>
    }
      )>
  }
    )>
}
  );

export const SheetDataDocument = gql`
  query SheetData($token: String, $spreadsheetId: String!, $ranges: String) {
    SheetsApi(access_token: $token) {
      spreadsheets {
        get(spreadsheetId: $spreadsheetId, ranges: $ranges, includeGridData: true) {
          properties {
            title
          }
          sheets {
            data {
              rowData {
                values {
                  effectiveValue {
                    stringValue
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SheetDataGQL extends Apollo.Query<SheetDataQuery, SheetDataQueryVariables> {
  document = SheetDataDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const SheetMetaDocument = gql`
  query SheetMeta($token: String, $spreadsheetId: String!, $ranges: String) {
    SheetsApi(access_token: $token) {
      spreadsheets {
        get(spreadsheetId: $spreadsheetId, ranges: $ranges, includeGridData: true) {
          properties {
            title
          }
          sheets {
            data {
              rowData {
                values {
                  formattedValue
                }
              }
            }
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SheetMetaGQL extends Apollo.Query<SheetMetaQuery, SheetMetaQueryVariables> {
  document = SheetMetaDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
