<?php

namespace CodeProject\Transformers;

use CodeProject\Entities\ProjectNote;
use League\Fractal\TransformerAbstract;

class ProjectNoteTransformer extends TransformerAbstract
{
    public function transform(ProjectNote $note)
    {
        return [
            'id' => $o->id,
            'project_id' => $o->project_id,
            'title' => $o->title,
            'note' => $o->note,
        ];
    }

}