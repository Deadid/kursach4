package com.smakhov.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "document")
public class DocumentEntity {
    @Id
    @Column(name = "doc_id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "court_code")
    private Court court;

    @ManyToOne
    @JoinColumn(name = "judgment_code")
    private Judgment judgment;

    @ManyToOne
    @JoinColumn(name = "justice_kind")
    private JusticeKind justiceKind;

    @ManyToOne
    @JoinColumn(name = "category_code")
    private Category category;

    @Column
    private Boolean indexed;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Court getCourt() {
        return court;
    }

    public void setCourt(Court court) {
        this.court = court;
    }

    public Judgment getJudgment() {
        return judgment;
    }

    public void setJudgment(Judgment judgment) {
        this.judgment = judgment;
    }

    public JusticeKind getJusticeKind() {
        return justiceKind;
    }

    public void setJusticeKind(JusticeKind justiceKind) {
        this.justiceKind = justiceKind;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getIndexed() {
        return indexed;
    }

    public void setIndexed(Boolean indexed) {
        this.indexed = indexed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DocumentEntity that = (DocumentEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(court, that.court) &&
                Objects.equals(judgment, that.judgment) &&
                Objects.equals(justiceKind, that.justiceKind) &&
                Objects.equals(category, that.category);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, court, judgment, justiceKind, category);
    }

    @Override
    public String toString() {
        return "DocumentEntity{" +
                "id='" + id + '\'' +
                ", court=" + court +
                ", judgment=" + judgment +
                ", justiceKind=" + justiceKind +
                ", category=" + category +
                '}';
    }
}
