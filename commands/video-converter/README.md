# Video Converter

A Ruby gem for converting video files using FFmpeg. This project is designed to work as a Raycast script and automatically converts videos from an `input` directory to an `output` directory.

## Features

- Automatically converts video files using FFmpeg
- Scales videos to 1920px width while maintaining aspect ratio
- Only converts files created today (skips older files)
- Skips files that have already been converted
- Supports both Raycast script and standalone Ruby execution
- Uses high-quality encoding settings (CRF 18, slow preset)

## Prerequisites

- Ruby 2.6.0 or higher
- FFmpeg installed on your system
- Bundler gem

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd commands/video-converter
   ```

3. Install dependencies:
   ```bash
   bundle install
   ```

4. Ensure FFmpeg is installed:
   ```bash
   # On macOS with Homebrew
   brew install ffmpeg
   
   # On Ubuntu/Debian
   sudo apt update && sudo apt install ffmpeg
   
   # On Windows
   # Download from https://ffmpeg.org/download.html
   ```

## Usage

### As a Raycast Script

1. Place video files in the `input/` directory
2. Run the Raycast command: `video:convert`
3. Converted videos will appear in the `output/` directory

### As a Standalone Ruby Script

1. Place video files in the `input/` directory
2. Run the converter:
   ```bash
   ruby convertio.rb
   # or
   ruby plg.rb
   ```

### Programmatic Usage

```ruby
require_relative "lib/video_convert"

converter = VideoConvert::Converter.new("./input", "./output")
converter.convert_all
```

## Configuration

The converter uses the following FFmpeg parameters:
- **Scale**: 1920px width, height auto-calculated to maintain aspect ratio
- **Preset**: slow (for better compression)
- **CRF**: 18 (high quality)
- **Log Level**: error (minimal output)

## Development

### Running Tests

```bash
# Run all tests
bundle exec rake test

# Run specific test file
bundle exec ruby spec/utils_spec.rb
```

### Code Quality

```bash
# Run RuboCop linting
bundle exec rake rubocop

# Run both tests and linting
bundle exec rake
```

### Development Dependencies

- **Guard**: File watching for automatic test running
- **Minitest**: Testing framework
- **RuboCop**: Code style and quality checker
- **Rake**: Task runner

## How It Works

1. **File Discovery**: Scans the `input/` directory for video files
2. **Filtering**: Only processes files that:
   - Were created today
   - Haven't been converted yet (not in `output/` directory)
   - Are actual files (not directories)
3. **Conversion**: Uses FFmpeg to convert each file with optimized settings
4. **Async Processing**: Each conversion runs in a separate process

## Requirements

- Ruby 2.6.0+
- FFmpeg
- Input videos in supported formats (MP4, MOV, AVI, etc.)

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass and code follows style guidelines
6. Submit a pull request

## Troubleshooting

### FFmpeg Not Found
Make sure FFmpeg is installed and available in your PATH:
```bash
ffmpeg -version
```

### Permission Issues
Ensure the script has write permissions to the `output/` directory:
```bash
chmod 755 output/
```

### No Files to Convert
The converter only processes files created today. If you need to convert older files, modify the `created_today?` check in the converter logic.
