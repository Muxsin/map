<?php

ini_set('memory_limit', '256M');

$json = file_get_contents('ny.json');
if ($json === false) {
    die("Failed to read file 'ny.json'");
}

$json_data = json_decode($json, true);
if ($json_data === null) {
    die("Failed to decode JSON data");
}

$pattern = '/-?\d+\.\d+ -?\d+\.\d+/';

$formatted_data = [];

foreach ($json_data['data'] as $data) {
    $multilinestring = $data[8];

    preg_match_all($pattern, $multilinestring, $matches);

    foreach ($matches[0] as $match) {
        $exploded = explode(' ', $match);

        $key = $data[12];
        $latitude = $exploded[1];
        $longitude = $exploded[0];

        $pairString = "$latitude,$longitude";

        if (!isset($formatted_data[$key]) ||!in_array($pairString, $formatted_data[$key])) {
            if (!isset($formatted_data[$key])) {
                $formatted_data[$key] = [];
            }

            $formatted_data[$key][] = "$latitude,$longitude";
        }
    }
}

$result = file_put_contents("geographic_coordinates.json", json_encode($formatted_data));
if ($result === false) {
    die("Failed to write to file 'geographic_coordinates.json'");
}
