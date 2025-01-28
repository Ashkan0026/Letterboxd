class Movie {
    constructor(id, title, desc, genre, image_path, build_year, added_by) {
        this._id = id
        this._title = title
        this._desc = desc
        this._genre = genre
        this._image_path = image_path
        this._build_year = build_year
        this._added_by = added_by
    }

    // Getter for ID
    get id() {
        return this._id;
    }

    // Getter for title
    get title() {
        return this._title;
    }

    // Setter for title
    set title(value) {
        this._title = value;
    }

    // Getter for description
    get desc() {
        return this._desc;
    }

    // Setter for description
    set desc(value) {
        this._desc = value;
    }

    // Getter for genre
    get genre() {
        return this._genre;
    }

    // Setter for genre
    set genre(value) {
        this._genre = value;
    }

    // Getter for image path
    get image_path() {
        return this._image_path;
    }

    // Setter for image path
    set image_path(value) {
        this._image_path = value;
    }

    // Getter for build year
    get build_year() {
        return this._build_year;
    }

    // Setter for build year
    set build_year(value) {
        this._build_year = value;
    }

    // Getter for added by
    get added_by() {
        return this._added_by;
    }

    // Setter for added by
    set added_by(value) {
        this._added_by = value;
    }
}