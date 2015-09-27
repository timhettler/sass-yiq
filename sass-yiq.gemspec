Gem::Specification.new do |s|
  # Release Specific Information
  s.version = "1.0.0"
  s.date = "2015-09-27"

  # Gem Details
  s.name = "sass-yiq"
  s.description = "Create more natural color contrasts"
  s.summary = "A sass plug-in that provides a function to determine the lightness of a color in the YIQ color space. (Formerly known as 'compass-yiq-color-contrast')"
  s.authors = ["Tim Hettler"]
  s.email = ["me+github@timhettler.com"]
  s.homepage = "https://github.com/timhettler/sass-yiq"
  s.license = "MIT"

  # Gem Files

  # README file
  s.files = ["README.md"]

  # Sass Files
  s.files += Dir.glob("src/sass/*.*")

  # Gems Dependencies
  s.add_dependency("sass")
end
